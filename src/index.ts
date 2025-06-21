import { entropyToMnemonic, mnemonicToSeedSync } from "bip39";
import BIP32Factory, { type BIP32Interface } from "bip32";
import * as ecc from "tiny-secp256k1";
import { payments } from "bitcoinjs-lib";
import { sha512 } from "sha.js";
import type { Network } from "./types/network_types";
import { MONERO_WORDLIST } from "./types/moneroWords";
import * as CRC32 from "crc-32";

const bip32 = BIP32Factory(ecc);

function getP2PKH(
  node: BIP32Interface,
  network: Network,
): string {
  const path = `m/44'/${ network.coin_type }'/0'/0/0`;
  return payments.p2pkh({
    pubkey: node.derivePath(path).publicKey,
    network,
  }).address!;
}

function getP2WPKH(
  node: BIP32Interface,
  network: Network,
): string {
  const path = `m/84'/${network.coin_type}'/0'/0/0`;
  return payments.p2wpkh({
    pubkey: node.derivePath(path).publicKey,
    network,
  }).address!;
}

export function generate_wallet(entropy: string, network: Network): { mnemonic: string, wif: string, p2pkh: string, p2wpkh: string } {
  const mnemonic = entropyToMnemonic(entropy);
  const seed = mnemonicToSeedSync(mnemonic);

  const node = bip32.fromSeed(seed, network);

  //monero
  if (network.coin_type == -1) {
    return {
      mnemonic: generate_monero_mnemonic(entropy),
      wif: "",
      p2pkh: "",
      p2wpkh: ""
    }
  }

  return {
    mnemonic: mnemonic,
    wif: node.toWIF(),
    p2pkh: getP2PKH(node, network),
    p2wpkh: network.bech32 != "" ? getP2WPKH(node, network) : "",
  };
}

export function generate_sha256(randomness: string) {
  return new sha512().update(randomness).digest("hex");
}

export function generate_monero_mnemonic(entropyHex: string): string {
  // — 2  hex -> Uint8Array (32 bytes) —
  const bytes = new Uint8Array(
    entropyHex.match(/../g)!.map((h) => parseInt(h, 16))
  );

  // — 3  eight *unsigned* 32-bit little-endian ints —
  const ints: number[] = [];
  for (let i = 0; i < 8; i++) {
    const o = i * 4;
    const x =
      bytes[o] +
      bytes[o + 1] * 0x100 +
      bytes[o + 2] * 0x10000 +
      bytes[o + 3] * 0x1000000; // multiplication keeps it unsigned
    ints.push(x);               // now 0 ≤ x ≤ 2^32-1
  }

  // — 4  base-1626 mapping —
  const words: string[] = [];
  for (const x of ints) {
    const w1 = x % 1626;

    const t1 = Math.floor(x / 1626);
    const w2 = (t1 + w1) % 1626;

    const t2 = Math.floor(t1 / 1626);
    const w3 = (t2 + w2) % 1626;

    words.push(
      MONERO_WORDLIST[w1],
      MONERO_WORDLIST[w2],
      MONERO_WORDLIST[w3]
    );
  }

  // — 5  CRC-32 over the first 24 prefixes —
  const crc = CRC32.str(words.slice(0, 24).map((w) => w.slice(0, 3)).join("")) >>> 0;
  const checksumWord = words[crc % 24];

  return [...words, checksumWord].join(" ");
}
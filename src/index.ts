import * as argon2 from "argon2-browser/dist/argon2-bundled.min.js";
import { entropyToMnemonic, mnemonicToSeedSync } from "bip39";
import BIP32Factory, { type BIP32Interface } from "bip32";
import * as ecc from "tiny-secp256k1";
import * as bitcoin from "bitcoinjs-lib";
import { sha512 } from "sha.js";

const LITECOIN = {
  messagePrefix: "\x19Litecoin Signed Message:\n",
  bech32: "ltc",
  bip32: {
    public: 0x019da462,
    private: 0x019d9cfe,
  },
  pubKeyHash: 0x30,
  scriptHash: 0x32,
  wif: 0xb0,
};

const BITCOINCASH = {
  messagePrefix: "\x18Bitcoin Cash Signed Message:\n",
  // CashAddr uses its own human-readable part (HRP):
  cashAddrPrefix: "bitcoincash",
  // Extended-key prefixes are identical to Bitcoin’s xpub/xprv
  bip32: {
    public: 0x0488b21e,   // 76067358 dec
    private: 0x0488ade4   // 76066276 dec
  },
  pubKeyHash: 0x00,       // legacy P2PKH (“1…”)
  scriptHash: 0x05,       // legacy P2SH  (“3…”)
  wif: 0x80               // WIF (“5…/K…/L…”)
};

const DOGECOIN = {
  messagePrefix: "\x19Dogecoin Signed Message:\n",
  // Dogecoin hasn’t rolled out BIP-173 (bech32) on mainnet yet:
  bech32: null,
  bip32: {
    public: 0x02facafd,   // “dpub…”
    private: 0x02fac398   // “dprv…”
  },
  pubKeyHash: 0x1e,       // P2PKH   →   D-addresses
  scriptHash: 0x16,       // P2SH    →   9- / A-addresses
  wif: 0x9e               // WIF     →   6-prefix
};

const bip32 = BIP32Factory(ecc);

function getP2PKH(
  node: BIP32Interface,
  network?: bitcoin.networks.Network | undefined,
  network_id: number = 0
): string {
  const path = `m/44'/${network_id}'/0'/0/0`;
  return bitcoin.payments.p2pkh({
    pubkey: node.derivePath(path).publicKey,
    network,
  }).address!;
}

function getP2WPKH(
  node: BIP32Interface,
  network?: bitcoin.networks.Network | undefined,
  network_id: number = 0
): string {
  const path = `m/84'/${network_id}'/0'/0/0`;
  return bitcoin.payments.p2wpkh({
    pubkey: node.derivePath(path).publicKey,
    network,
  }).address!;
}

export async function argon2_hash(adjective: string, noun: string, date: Date) {
  const input =
    date.getFullYear() + adjective + date.getDay() + noun + date.getMonth();

  return argon2.hash({
    pass: input,
    salt: "69a201418f033b7c24a12989c2f71358ce77bfbc",
    parallelism: 2,
    time: 1 << 11,
    mem: 2048,
    hashLen: 16,
    type: argon2.ArgonType.Argon2id,
  });
}

export function generate_wallet(entropy: string) {
  const mnemonic = entropyToMnemonic(entropy);
  const seed = mnemonicToSeedSync(mnemonic);

  const node = bip32.fromSeed(seed, LITECOIN);

  return {
    mnemonic: mnemonic,
    wif: node.toWIF(),
    p2pkh: getP2PKH(node, LITECOIN, 2),
    p2wpkh: getP2WPKH(node, LITECOIN, 2),
  };
}

export function generate_sha256(randomness: string) {
  return new sha512().update(randomness).digest('hex');
}
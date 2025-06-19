import { entropyToMnemonic, mnemonicToSeedSync } from "bip39";
import BIP32Factory, { type BIP32Interface } from "bip32";
import * as ecc from "tiny-secp256k1";
import { payments } from "bitcoinjs-lib";
import { sha512 } from "sha.js";
import type { Network } from "./types/network_types";

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

export function generate_wallet(entropy: string, network: Network) {
  const mnemonic = entropyToMnemonic(entropy);
  const seed = mnemonicToSeedSync(mnemonic);

  const node = bip32.fromSeed(seed, network);

  return {
    mnemonic: mnemonic,
    wif: node.toWIF(),
    p2pkh: getP2PKH(node, network),
    p2wpkh: network.bech32 != "" ? getP2WPKH(node, network) : undefined,
  };
}

export function generate_sha256(randomness: string) {
  return new sha512().update(randomness).digest("hex");
}

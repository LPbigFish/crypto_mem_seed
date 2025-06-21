import { networks } from "bitcoinjs-lib";
import BitcoinLogo from "../assets/bitcoin-btc-logo.svg";
import LitecoinLogo from "../assets/litecoin-ltc-logo.svg";
import BitcoinCashLogo from "../assets/bitcoin-cash-bch-logo.svg";
import DogeCoinLogo from "../assets/dogecoin-doge-logo-alternative.svg";
import MoneroLogo from "../assets/monero-xmr-logo.svg";

export interface Network extends networks.Network {
  coin_type: number;
}

const BITCOIN: Network = {
  ...networks.bitcoin,
  coin_type: 0,
};

const LITECOIN: Network = {
  messagePrefix: "\x19Litecoin Signed Message:\n",
  bech32: "ltc",
  bip32: {
    public: 0x019da462,
    private: 0x019d9cfe,
  },
  pubKeyHash: 0x30,
  scriptHash: 0x32,
  wif: 0xb0,
  coin_type: 2,
};

const BITCOINCASH: Network = {
  messagePrefix: "\x18Bitcoin Cash Signed Message:\n",
  // CashAddr uses its own human-readable part (HRP):
  bech32: "",
  // Extended-key prefixes are identical to Bitcoin’s xpub/xprv
  bip32: {
    public: 0x0488b21e, // 76067358 dec
    private: 0x0488ade4, // 76066276 dec
  },
  pubKeyHash: 0x00, // legacy P2PKH (“1…”)
  scriptHash: 0x05, // legacy P2SH  (“3…”)
  wif: 0x80, // WIF (“5…/K…/L…”)
  coin_type: 145,
};

const DOGECOIN: Network = {
  messagePrefix: "\x19Dogecoin Signed Message:\n",
  // Dogecoin hasn’t rolled out BIP-173 (bech32) on mainnet yet:
  bech32: "",
  bip32: {
    public: 0x02facafd, // “dpub…”
    private: 0x02fac398, // “dprv…”
  },
  pubKeyHash: 0x1e, // P2PKH   →   D-addresses
  scriptHash: 0x16, // P2SH    →   9- / A-addresses
  wif: 0x9e, // WIF     →   6-prefix
  coin_type: 3,
};

const MONERO: Network = {
  messagePrefix: "\x19Dogecoin Signed Message:\n",
  // Dogecoin hasn’t rolled out BIP-173 (bech32) on mainnet yet:
  bech32: "",
  bip32: {
    public: 0, // “dpub…”
    private: 0, // “dprv…”
  },
  pubKeyHash: 0, // P2PKH   →   D-addresses
  scriptHash: 0, // P2SH    →   9- / A-addresses
  wif: 0, // WIF     →   6-prefix
  coin_type: -1,
};

export const NETWORKS = {
  btc: BITCOIN,
  ltc: LITECOIN,
  bch: BITCOINCASH,
  doge: DOGECOIN,
  xmr: MONERO,
};

export interface NETWORK_OPTION {
    value: Network;
    vt: string;
    label: string;
    Icon: string;
}

export const OPTIONS: NETWORK_OPTION[] = [
  { value: NETWORKS.btc, vt: "btc", label: "Bitcoin", Icon: BitcoinLogo },
  { value: NETWORKS.ltc, vt: "ltc", label: "Litecoin", Icon: LitecoinLogo },
  {
    value: NETWORKS.bch,
    vt: "bch",
    label: "Bitcoin Cash",
    Icon: BitcoinCashLogo,
  },
  { value: NETWORKS.doge, vt: "doge", label: "Dogecoin", Icon: DogeCoinLogo },
  { value: NETWORKS.xmr, vt: "xmr", label: "Monero", Icon: MoneroLogo }
];
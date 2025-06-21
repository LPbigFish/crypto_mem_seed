import type { NETWORK_OPTION } from "./network_types";

export interface FormState {
  date: Date;

  passphrase: string;
}

export interface GeneratorFormProps {
  busy: boolean;

  doHash: () => void | Promise<void>;

  form: FormState;

  setForm: React.Dispatch<React.SetStateAction<FormState>>;
}

export interface WalletModalProps {
  wallet: {
    mnemonic: string;
    wif: string;
    p2pkh: string;
    p2wpkh: string | undefined;
  } | undefined;

  onClose: () => void;
}

export interface CryptoDropdownProps {
  value: NETWORK_OPTION;

  onChange: React.Dispatch<React.SetStateAction<NETWORK_OPTION>>;
}
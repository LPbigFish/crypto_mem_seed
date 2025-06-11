export interface FormState {
  /** User-selected calendar date */
  date: Date;
  /** Two-word secret (“adjective noun”) */
  passphrase: string;
}

/** Props accepted by the <GeneratorForm> component */
export interface GeneratorFormProps {
  /** True while the web-worker is crunching the hash */
  busy: boolean;

  /** Kick off hashing in the parent.
   *  It may or may not be awaited by the caller, so allow either return type. */
  doHash: () => void | Promise<void>;

  /** Current form values */
  form: FormState;

  /** State setter lifted from the parent */
  setForm: React.Dispatch<React.SetStateAction<FormState>>;
}

export interface WalletModalProps {
  wallet: {
    mnemonic: string;
    wif: string;
    p2pkh: string;
    p2wpkh: string;
  } | undefined;

  onClose: () => void;
}

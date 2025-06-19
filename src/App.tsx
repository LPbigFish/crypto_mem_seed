import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { generate_wallet } from ".";
import GeneratorForm from "./Components/GeneratorForm";
import WalletModal from "./Components/WalletModal";
import { NetworkCtx } from "./utils/Contexts";

function App() {
  const workerRef = useRef<Worker>(null);

  const network = useContext(NetworkCtx);

  const [busy, setBusy] = useState<boolean>(false);

  const [form, setForm] = useState({ date: new Date(), passphrase: "" });

  const [hash, setHash] = useState<string>("");

  const [show, setShow] = useState<boolean>(false);

  const wallet = useMemo(() => {
    if (!hash || !network) return undefined;
    return generate_wallet(hash, network.value);
  }, [hash, network]);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("./argon.worker.ts", import.meta.url),
      { type: "module" }
    );

    workerRef.current.onmessage = (e) => {
      const _hash = e.data as string;
      setHash(_hash);
      setBusy(false);
      setShow(true);
    };

    return () => workerRef.current?.terminate();
  }, []);

  const doHash = async () => {
    setBusy(true);

    const [adjective, noun] = form.passphrase.split(" ");

    workerRef.current?.postMessage([
      adjective,
      noun,
      form.date || new Date(2004, 11, 17, 0, 0, 0, 0),
    ]);
  };

  return (
    <>
      <main className="min-h-screen max-w-screen flex flex-col bg-base-200">
        <GeneratorForm
          busy={busy}
          doHash={doHash}
          form={form}
          setForm={setForm}
          network={network}
        />
        {show ? (
          <WalletModal wallet={wallet} onClose={() => setShow(false)} />
        ) : (
          <></>
        )}
      </main>
    </>
  );
}

export default App;
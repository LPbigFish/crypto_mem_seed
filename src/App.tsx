import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { generate_wallet } from ".";
import GeneratorForm from "./Components/GeneratorForm";
import WalletModal from "./Components/WalletModal";
import { NetworkCtx } from "./utils/Contexts";
import { NETWORKS } from "./types/network_types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

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
      network.value === NETWORKS.xmr ? 256 : 128
    ]);
  };

  return (
    <>
      <main className="min-h-screen max-w-screen flex flex-col bg-base-200 pt-4">
        <GeneratorForm
          busy={busy}
          doHash={doHash}
          form={form}
          setForm={setForm}
        />
        {show ? (
          <WalletModal wallet={wallet} onClose={() => setShow(false)} />
        ) : (
          <></>
        )}
        <a href="https://github.com/LPbigFish/" className="p-2 btn btn-ghost fixed bottom-4 left-1/2 -translate-x-1/2 -mr-2 sm:hidden">
          <FontAwesomeIcon icon={faGithub} className="text-3xl" />
        </a>
      </main>
    </>
  );
}

export default App;
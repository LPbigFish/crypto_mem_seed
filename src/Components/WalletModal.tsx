import { useEffect, useRef } from "react";
import type { WalletModalProps } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faSquareCheck } from "@fortawesome/free-solid-svg-icons";

function WalletModal({ wallet, onClose }: WalletModalProps) {
  const modal = useRef<HTMLDialogElement>(null);

  useEffect(() => modal.current?.showModal(), []);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
  };

  return (
    <>
      <dialog ref={modal} onClose={onClose} className="modal w-screen bg-base-100">
        <div className="modal-box p-8 max-w-xl">
          <h3 className="flex font-bold text-xl items-center gap-3"><FontAwesomeIcon icon={faSquareCheck} className="text-green-600 text-3xl" /> Your Wallet Was Generated:</h3>
          <div className="flex flex-row">
            <div className="mt-4 overflow-x-auto">
              <table className="table">
                <tbody>
                  <tr>
                    <th className="sticky left-0 bg-base-100">Mnemotic: </th>
                    <td>{wallet?.mnemonic}</td>
                    <td className="sticky right-0 bg-base-100 h-full">
                      <button
                        type="button"
                        className="btn btn-square btn-ghost px-4 bg-base-100 z-20"
                        onClick={() => handleCopy(wallet?.mnemonic || "")}
                      >
                        <FontAwesomeIcon icon={faCopy} />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th className="sticky left-0 bg-base-100">WIF: </th>
                    <td>{wallet?.wif}</td>
                    <td className="sticky right-0 bg-base-100 h-full">
                      <button
                        type="button"
                        className="btn btn-square btn-ghost px-4 bg-base-100 z-20"
                        onClick={() => handleCopy(wallet?.wif || "")}
                      >
                        <FontAwesomeIcon icon={faCopy} />
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <th className="sticky left-0 bg-base-100">Address: </th>
                    <td>{wallet?.p2pkh}</td>
                    <td className="sticky right-0 bg-base-100 h-full">
                      <button
                        type="button"
                        className="btn btn-square btn-ghost px-4 bg-base-100 z-20"
                        onClick={() => handleCopy(wallet?.p2pkh || "")}
                      >
                        <FontAwesomeIcon icon={faCopy} />
                      </button>
                    </td>
                  </tr>
                  {wallet?.p2wpkh ? (
                    <tr>
                      <th className="sticky left-0 bg-base-100">
                        Witness Address:{" "}
                      </th>
                      <td>{wallet?.p2wpkh}</td>
                      <td className="sticky right-0 bg-base-100 h-full">
                        <button
                          type="button"
                          className="btn btn-square btn-ghost px-4 bg-base-100 z-20"
                          onClick={() => handleCopy(wallet?.p2wpkh || "")}
                        >
                          <FontAwesomeIcon icon={faCopy} />
                        </button>
                      </td>
                    </tr>
                  ) : (
                    <></>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
}

export default WalletModal;

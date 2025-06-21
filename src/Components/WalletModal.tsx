import { useEffect, useRef } from "react";
import type { WalletModalProps } from "../types/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faSquareCheck } from "@fortawesome/free-solid-svg-icons";

const handleCopy = async (text: string) => {
  await navigator.clipboard.writeText(text);
};

function TableRow({title, content}: { title: string, content: string | undefined }) {
  if (content === "") {
    return <></>;
  }
  return (
    <tr>
      <th className="sticky left-0 bg-base-100">{title}: </th>
      <td>{content}</td>
      <td className="sticky -right-0.5 bg-base-100 h-full">
        <button
          type="button"
          className="btn btn-square btn-ghost px-4 bg-base-100 z-20"
          onClick={() => handleCopy(content || "")}
        >
          <FontAwesomeIcon icon={faCopy} />
        </button>
      </td>
    </tr>
  );
}

function WalletModal({ wallet, onClose }: WalletModalProps) {
  const modal = useRef<HTMLDialogElement>(null);

  useEffect(() => modal.current?.showModal(), []);

  return (
    <>
      <dialog
        ref={modal}
        onClose={onClose}
        className="modal w-screen bg-base-100"
      >
        <div className="modal-box p-8 max-w-xl">
          <h3 className="flex font-bold text-xl items-center gap-3">
            <FontAwesomeIcon
              icon={faSquareCheck}
              className="text-green-600 text-3xl"
            />{" "}
            Your Wallet Was Generated:
          </h3>
          <div className="flex flex-row">
            <div className="mt-4 overflow-x-auto">
              <table className="table">
                <tbody>
                  <TableRow title="Mnemonic" content={wallet?.mnemonic} />
                  <TableRow title="WIF" content={wallet?.wif} />
                  <TableRow title="Address" content={wallet?.p2pkh} />
                  <TableRow title="Witness Address" content={wallet?.p2wpkh} />
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

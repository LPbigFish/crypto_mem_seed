import type { GeneratorFormProps } from "../types/types";
import { useContext } from "react";
import { NetworkCtx } from "../utils/Contexts";
import DatePicker from "./DatePicker";

const regex = /^[A-Za-z]+(?:-[A-Za-z]+)? [A-Za-z]+(?:-[A-Za-z]+)?$/;

function GeneratorForm({ busy, doHash, form, setForm }: GeneratorFormProps) {
  const network = useContext(NetworkCtx);

  const isValid = regex.test(form.passphrase);

  return (
    <>
      <div className="card lg:card-side shadow-2xl mx-auto mt-8 bg-base-100 rounded-4xl">
        <div className="card-body">
          <h2 className="ml-1 card-title"><img src={network.Icon} className="aspect-square w-6" />Generator</h2>
          <form
            className="fieldset p-2 min-w-2xs sm:min-w-md lg:min-w-xl"
            onSubmit={(e) => {
              e.preventDefault();
              doHash();
            }}
          >
            <label className="label">Memo words</label>
            <input
              type="text"
              name="text_input"
              id="textbox_1"
              className="input md:input-lg validator w-full"
              placeholder="Enter an adjective with a noun..."
              required
              pattern="\p{L}+(?:-\p{L}+)? \p{L}+(?:-\p{L}+)?"
              value={form.passphrase}
              disabled={busy}
              onChange={(pass) =>
                setForm((f) => ({ ...f, passphrase: pass.target.value }))
              }
            />
            <label className="label">Pick a date</label>
            <DatePicker disabled={busy} date={form.date} onChange={(date: Date) => setForm((f) => ({ ...f, date: date || f.date }) )} />
            <button
              type="submit"
              disabled={busy || !isValid}
              className={`btn btn-lg px-1 mt-4 transition-all duration-300 ${
                busy ? "btn-disabled" : "btn-primary"
              }`}
            >
              {busy ? (
                <span className="loading loading-infinity loading-sm"></span>
              ) : (
                <></>
              )}
              {busy ? "Hashing..." : "Generate " + network.label + " Wallet"}
            </button>
          </form>
        </div>
        <div className="max-w-2xl w-full"></div>
      </div>
    </>
  );
}

export default GeneratorForm;

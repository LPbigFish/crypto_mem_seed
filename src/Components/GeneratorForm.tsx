import type { GeneratorFormProps } from "../types/types";
import { useContext, useEffect, useState } from "react";
import { NetworkCtx } from "../utils/Contexts";
import DatePicker from "./DatePicker";
import { isValidDate } from "..";

const regex = /^[A-Za-z]+(?:-[A-Za-z]+)? [A-Za-z]+(?:-[A-Za-z]+)?$/;

function GeneratorForm({ busy, doHash, form, setForm }: GeneratorFormProps) {
  const network = useContext(NetworkCtx);

  const [isValid, setValid] = useState<boolean>(false);

  const [invalid, setInvalid] = useState<"reg" | "date" | "both" | "none">("none");

  useEffect(() => {
    const reg = regex.test(form.passphrase);

    const date = isValidDate(
      form.date.getUTCFullYear(),
      form.date.getMonth(),
      form.date.getDate()
    );

    if (!(date || reg)) {
      setInvalid("both");
    } else if (!reg) {
      setInvalid("reg");
    } else if (!date) {
      setInvalid("date");
    } else {
      setInvalid("none");
    }

    setValid(reg && date);
  }, [form]);

  return (
    <>
      <div className="card lg:card-side shadow-2xl mx-auto mt-20 sm:mt-28 bg-base-100 rounded-4xl">
        <div className="card-body">
          <h2 className="ml-1 card-title">
            <img src={network.Icon} className="aspect-square w-6" />
            Generator
          </h2>
          <form
            className="fieldset p-2 min-w-2xs sm:min-w-md lg:min-w-xl space-y-1"
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
              autoComplete="off"
              value={form.passphrase}
              disabled={busy}
              onChange={(pass) =>
                setForm((f) => ({ ...f, passphrase: pass.target.value }))
              }
            />
            <label className="label">Pick a date</label>
            <DatePicker
              disabled={busy}
              date={form.date}
              onChange={(date: Date) =>
                setForm((f) => ({ ...f, date: date || f.date }))
              }
            />
            <div
              role="alert"
              className={`alert alert-error alert-outline ${
                invalid == "date" || invalid == "both"
                  ? ""
                  : "hidden"
              }`}
            >
              <span>
                Error! Invalid {" "}
                {invalid == "reg"
                  ? "Passphrase"
                  : invalid == "date"
                  ? "Date Range"
                  : "Passphrase and Date Range"}
              </span>
            </div>
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

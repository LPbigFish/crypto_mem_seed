import { DayPicker } from "react-day-picker";
import type { GeneratorFormProps } from "./types";

const regex = /^[A-Za-z]+(?:-[A-Za-z]+)? [A-Za-z]+(?:-[A-Za-z]+)?$/;

function GeneratorForm({ busy, doHash, form, setForm }: GeneratorFormProps) {
  const isValid = regex.test(form.passphrase);

  return (
    <>
      <div className="card lg:card-side shadow-md mx-auto mt-8 bg-base-100">
        <div className="card-body">
          <h2 className="card-title">Generator</h2>
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
            <button
              type="button"
              popoverTarget="rdp-popover"
              disabled={busy}
              className="input input-border md:input-lg w-full"
              style={{ anchorName: "--rdp" } as React.CSSProperties}
            >
              {form.date ? form.date.toLocaleDateString() : "Pick a date"}
            </button>
            <div
              popover="auto"
              id="rdp-popover"
              className="dropdown scale-125 top-8"
              style={{ positionAnchor: "--rdp" } as React.CSSProperties}
            >
              <DayPicker
                className="react-day-picker"
                mode="single"
                selected={form.date}
                onSelect={(date) =>
                  setForm((f) => ({ ...f, date: date || form.date }))
                }
              />
            </div>
            <button
              type="submit"
              disabled={busy || !isValid}
              className={`btn btn-lg px-1 mt-4 ${
                busy ? "btn-disabled" : "btn-primary"
              }`}
            >
              {busy ? (
                <span className="loading loading-infinity loading-sm"></span>
              ) : (
                <></>
              )}
              {busy ? "Hashing..." : "Generate"}
            </button>
          </form>
        </div>
        <div className="max-w-2xl w-full"></div>
      </div>
    </>
  );
}

export default GeneratorForm;

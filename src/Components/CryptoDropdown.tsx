import { OPTIONS } from "../types/network_types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import type { CryptoDropdownProps } from "../types/types";
import { useRef } from "react";

export default function CryptoDropdown({
  value,
  onChange,
}: CryptoDropdownProps) {
  const btn_ref = useRef<HTMLUListElement>(null);
  const current = OPTIONS.find((o) => o.value === value.value) ?? OPTIONS[0];

  return (
    <>
      <div className="dropdown dropdown-bottom p-0 mx-3">
        <div
          tabIndex={0}
          role="button"
          className="btn justify-between md:w-46 normal-case"
        >
          <span className="flex items-center gap-2 text-lg font-normal">
            <img src={current.Icon} className="aspect-square w-5" />
            <span className="not-sm:hidden">
                {current.label}
            </span>
          </span>
          <FontAwesomeIcon icon={faCaretDown} className="h-4 aspect-square" />
        </div>

        <ul
          tabIndex={0}
            ref={btn_ref}
          className="border border-base-300 dropdown-content menu -left-4 sm:menu-lg bg-base-100 rounded-box z-1 sm:w-46 p-2 shadow-md text-neutral"
        >
          {OPTIONS.map((o) => (
            <li key={o.vt}>
              <a
                onClick={() => {
                  onChange(o);
                  btn_ref.current?.blur();
                }}
                className="flex items-center gap-2"
              >
                <img src={o.Icon} className="relative w-8 sm:w-5" /><span className="not-sm:hidden">{o.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

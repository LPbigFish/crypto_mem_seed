import { useState, type PropsWithChildren } from "react";
import CryptoDropdown from "./Components/CryptoDropdown";
import { OPTIONS } from "./types/network_types";
import { NetworkCtx } from "./utils/Contexts";

type PageProps = PropsWithChildren;
function Navbar({ children }: PageProps) {
  const [current, onChange] = useState(OPTIONS[0]);

  return (
    <>
      <div className="navbar bg-base-100 shadow-md sticky z-50">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">Wallet Generator</a>
        </div>
        <div className="not-xl:navbar-end xl:navbar-center flex">
          <ul className="menu menu-horizontal px-1">
            <li><CryptoDropdown value={current} onChange={onChange} /></li>
          </ul>
        </div>
        <div className="xl:navbar-end" />
      </div>
      <NetworkCtx.Provider value={current}>
        {children}
      </NetworkCtx.Provider>
    </>
  );
}

export default Navbar;

import { useState, type PropsWithChildren } from "react";
import CryptoDropdown from "./Components/CryptoDropdown";
import { OPTIONS } from "./types/network_types";
import { NetworkCtx } from "./utils/Contexts";
import LOGO from "./assets/icon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

type PageProps = PropsWithChildren;
function Navbar({ children }: PageProps) {
  const [current, onChange] = useState(OPTIONS[0]);

  return (
    <>
      <div className="navbar bg-base-100 shadow-md sticky z-50">
        <div className="navbar-start">
          <img src={LOGO} alt="icon" className="h-12 sm:h-16 -mr-2" />
          <a className="text-xl mx-3 whitespace-nowrap">Wallet Generator</a>
        </div>
        <div className="not-xl:navbar-end xl:navbar-center flex">
          <ul className="menu menu-horizontal px-1">
            <li><CryptoDropdown value={current} onChange={onChange} /></li>
          </ul>
        </div>
        <div className="not-sm:hidden xl:navbar-end">
          <a href="https://github.com/LPbigFish/" className="mr-5 p-2 btn btn-ghost">
            <FontAwesomeIcon icon={faGithub} className="text-3xl" />
          </a>
        </div>
      </div>
      <NetworkCtx.Provider value={current}>
        {children}
      </NetworkCtx.Provider>
    </>
  );
}

export default Navbar;

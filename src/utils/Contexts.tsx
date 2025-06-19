import { createContext } from "react";
import { OPTIONS, type NETWORK_OPTION } from "../types/network_types";

export const NetworkCtx = createContext<NETWORK_OPTION>(OPTIONS[0]);
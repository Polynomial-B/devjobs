import { createContext } from "react";
import { ActiveIDContextType } from "../lib/types";

export const ActiveIDContext = createContext<ActiveIDContextType | null>(null);

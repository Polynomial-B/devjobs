import { createContext } from "react";
import { SearchTextContextType } from "../lib/types";

export const SearchTextContext = createContext<SearchTextContextType | null>(
  null
);

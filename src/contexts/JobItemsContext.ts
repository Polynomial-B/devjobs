import { createContext } from "react";
import { JobItemsContextType } from "../lib/types";

export const JobItemsContext = createContext<JobItemsContextType | null>(null);

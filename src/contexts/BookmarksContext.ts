import { createContext } from "react";
import { BookmarksContextType } from "../lib/types";

export const BookmarksContext = createContext<BookmarksContextType | null>(
  null
);

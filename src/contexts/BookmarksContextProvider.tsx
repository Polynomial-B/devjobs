import { ReactNode, useCallback, useMemo } from "react";
import { BookmarksContext } from "./BookmarksContext";
import { useJobItems, useLocalStorage } from "../lib/hooks";

export default function BookmarksContextProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [bookmarkedIDs, setBookmarkedIDs] = useLocalStorage<number[]>(
		"bookmarkedIDs",
		[]
	);

	const { jobItems: bookmarkedJobItems, isLoading } =
		useJobItems(bookmarkedIDs);

	const handleToggleBookmark = useCallback(
		(id: number) => {
			if (bookmarkedIDs.includes(id)) {
				setBookmarkedIDs((prev) => prev.filter((item) => item !== id));
			} else {
				setBookmarkedIDs((prev) => [...prev, id]);
			}
		},
		[bookmarkedIDs, setBookmarkedIDs]
	);

	const contextValue = useMemo(
		() => ({
			bookmarkedIDs,
			handleToggleBookmark,
			bookmarkedJobItems,
			isLoading,
		}),
		[bookmarkedIDs, handleToggleBookmark, bookmarkedJobItems, isLoading]
	);

	return (
		<BookmarksContext.Provider value={contextValue}>
			{children}
		</BookmarksContext.Provider>
	);
}

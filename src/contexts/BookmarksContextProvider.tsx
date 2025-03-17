import { ReactNode } from "react";
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

	const handleToggleBookmark = (id: number) => {
		if (bookmarkedIDs.includes(id)) {
			setBookmarkedIDs((prev) => prev.filter((item) => item !== id));
		} else {
			setBookmarkedIDs((prev) => [...prev, id]);
		}
	};

	return (
		<BookmarksContext.Provider
			value={{
				bookmarkedIDs,
				handleToggleBookmark,
				bookmarkedJobItems,
				isLoading,
			}}
		>
			{children}
		</BookmarksContext.Provider>
	);
}

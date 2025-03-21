import { ReactNode, useCallback, useMemo, useState } from "react";
import { useDebounce } from "../lib/hooks";
import { SearchTextContext } from "./SearchTextContext";

export default function SearchTextContextProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [searchText, setSearchText] = useState("");
	const debouncedSearchText = useDebounce(searchText, 300);

	const handleChangeSearchText = useCallback((newSearchText: string) => {
		setSearchText(newSearchText);
	}, []);

	const contextValue = useMemo(
		() => ({
			searchText,
			debouncedSearchText,
			handleChangeSearchText,
		}),
		[searchText, debouncedSearchText, handleChangeSearchText]
	);

	return (
		<SearchTextContext.Provider value={contextValue}>
			{children}
		</SearchTextContext.Provider>
	);
}

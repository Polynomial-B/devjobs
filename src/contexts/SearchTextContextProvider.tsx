import { ReactNode, useState } from "react";
import { useDebounce } from "../lib/hooks";
import { SearchTextContext } from "./SearchTextContext";

export default function SearchTextContextProvider({
	children,
}: {
	children: ReactNode;
}) {
	const [searchText, setSearchText] = useState("");
	const debouncedSearchText = useDebounce(searchText, 300);

	const handleChangeSearchText = (newSearchText: string) => {
		setSearchText(newSearchText);
	};

	return (
		<SearchTextContext.Provider
			value={{
				searchText,
				debouncedSearchText,
				handleChangeSearchText,
			}}
		>
			{children}
		</SearchTextContext.Provider>
	);
}

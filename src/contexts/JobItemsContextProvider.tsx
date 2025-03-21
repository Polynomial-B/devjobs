import { ReactNode, useCallback, useMemo, useState } from "react";
import { useSearch, useSearchTextContext } from "../lib/hooks";
import { DirectionType, SortByType } from "../lib/types";
import { JobItemsContext } from "./JobItemsContext";
import { itemsPerPage } from "../lib/constants";

export default function JobItemsContextProvider({
	children,
}: {
	children: ReactNode;
}) {
	const { debouncedSearchText } = useSearchTextContext();

	const [currentPage, setCurrentPage] = useState(1);
	const { jobItems, isLoading } = useSearch(debouncedSearchText);
	const [sortBy, setSortBy] = useState<SortByType>("relevant");

	const jobItemsSorted = useMemo(
		() =>
			structuredClone(jobItems || []).sort((a, b) => {
				if (sortBy === "relevant") {
					return b.relevanceScore - a.relevanceScore;
				} else {
					return a.daysAgo - b.daysAgo;
				}
			}),
		[sortBy, jobItems]
	);

	const slicedJobItems = useMemo(
		() =>
			jobItemsSorted.slice(
				currentPage * itemsPerPage - itemsPerPage,
				currentPage * itemsPerPage
			) || [],
		[currentPage, jobItemsSorted]
	);

	const totalJobCount = jobItems?.length || 0;
	const totalPageNumber = Math.floor(totalJobCount / itemsPerPage);

	const handleChangePage = useCallback(
		(direction: DirectionType) => {
			if (direction === "next" && totalJobCount) {
				setCurrentPage((prev) => prev + 1);
			} else if (direction === "previous" && currentPage > 1) {
				setCurrentPage((prev) => prev - 1);
			}
		},
		[currentPage, totalJobCount]
	);

	const handleSortBy = useCallback((newSortBy: SortByType) => {
		setCurrentPage(1);
		setSortBy(newSortBy);
	}, []);

	const contextValue = useMemo(
		() => ({
			jobItems,
			slicedJobItems,
			isLoading,
			totalJobCount,
			totalPageNumber,
			currentPage,
			sortBy,
			handleChangePage,
			handleSortBy,
		}),
		[
			jobItems,
			slicedJobItems,
			isLoading,
			totalJobCount,
			totalPageNumber,
			currentPage,
			sortBy,
			handleChangePage,
			handleSortBy,
		]
	);

	return (
		<JobItemsContext.Provider value={contextValue}>
			{children}
		</JobItemsContext.Provider>
	);
}

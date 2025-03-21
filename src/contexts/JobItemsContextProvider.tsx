import { ReactNode, useMemo, useState } from "react";
import { useSearch, useSearchTextContext } from "../lib/hooks";
import { Direction, SortBy } from "../lib/types";
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
	const [sortBy, setSortBy] = useState<SortBy>("relevant");

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

	const handleChangePage = (direction: Direction) => {
		if (direction === "next" && totalJobCount) {
			setCurrentPage((prev) => prev + 1);
		} else if (direction === "previous" && currentPage > 1) {
			setCurrentPage((prev) => prev - 1);
		}
	};

	const handleSortBy = (sortBy: SortBy) => {
		setCurrentPage(1);
		setSortBy(sortBy);
	};

	return (
		<JobItemsContext.Provider
			value={{
				jobItems,
				slicedJobItems,
				isLoading,
				totalJobCount,
				totalPageNumber,
				currentPage,
				sortBy,
				handleChangePage,
				handleSortBy,
			}}
		>
			{children}
		</JobItemsContext.Provider>
	);
}

import { useState } from "react";
import Background from "./components/Background";
import Container from "./components/Container";
import Header from "./components/Header";
import { useDebounce, useJobItems } from "./lib/hooks";
import { Toaster } from "react-hot-toast";
import { itemsPerPage } from "./lib/constants";
import { Direction, SortBy } from "./lib/types";

function App() {
	const [searchText, setSearchText] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const debouncedSearchText = useDebounce(searchText, 300);
	const { jobItems, isLoading } = useJobItems(debouncedSearchText);
	const [sortBy, setSortBy] = useState<SortBy>("relevant");
	const jobItemsSorted = structuredClone(jobItems || []).sort((a, b) => {
		if (sortBy === "relevant") {
			return b.relevanceScore - a.relevanceScore;
		} else {
			return a.daysAgo - b.daysAgo;
		}
	});
	const slicedJobItems =
		jobItemsSorted.slice(
			currentPage * itemsPerPage - itemsPerPage,
			currentPage * itemsPerPage
		) || [];

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
		<>
			<Background />
			<Header searchText={searchText} setSearchText={setSearchText} />
			<Container
				jobItems={slicedJobItems}
				isLoading={isLoading}
				totalJobCount={totalJobCount}
				handleChangePage={handleChangePage}
				currentPage={currentPage}
				totalPageNumber={totalPageNumber}
				handleSortBy={handleSortBy}
				sortBy={sortBy}
			/>
			<Toaster position="top-right" />
		</>
	);
}

export default App;

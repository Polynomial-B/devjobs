import { useState } from "react";
import Background from "./components/Background";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useDebounce, useJobItems } from "./lib/hooks";
import { Toaster } from "react-hot-toast";
import { itemsPerPage } from "./lib/constants";

function App() {
	const [searchText, setSearchText] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const debouncedSearchText = useDebounce(searchText, 300);
	const { jobItems, isLoading } = useJobItems(debouncedSearchText);
	const slicedJobItems =
		jobItems?.slice(
			currentPage * itemsPerPage - itemsPerPage,
			currentPage * itemsPerPage
		) || [];
	const totalJobCount = jobItems?.length || 0;
	const totalPageNumber = Math.floor(totalJobCount / itemsPerPage);

	const handleChangePage = (direction: "next" | "previous") => {
		if (direction === "next" && totalJobCount) {
			setCurrentPage((prev) => prev + 1);
		} else if (direction === "previous" && currentPage > 1) {
			setCurrentPage((prev) => prev - 1);
		}
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
			/>
			<Footer />
			<Toaster position="top-right" />
		</>
	);
}

export default App;

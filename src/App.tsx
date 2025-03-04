import { useState } from "react";
import Background from "./components/Background";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useDebounce, useJobItems } from "./lib/hooks";
import { Toaster } from "react-hot-toast";

function App() {
	const [searchText, setSearchText] = useState("");
	const debouncedSearchText = useDebounce(searchText, 300);
	const { jobItems, isLoading } = useJobItems(debouncedSearchText);
	const slicedJobItems = jobItems?.slice(0, 7) || [];
	const totalJobCount = jobItems?.length || 0;

	return (
		<>
			<Background />
			<Header searchText={searchText} setSearchText={setSearchText} />
			<Container
				jobItems={slicedJobItems}
				isLoading={isLoading}
				totalJobCount={totalJobCount}
			/>
			<Footer />
			<Toaster position="top-right" />
		</>
	);
}

export default App;

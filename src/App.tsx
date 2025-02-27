import { useState } from "react";
import Background from "./components/Background";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useDebounce, useJobItems } from "./lib/hooks";

function App() {
	const [searchText, setSearchText] = useState("");
	const debouncedSearchText = useDebounce(searchText, 300);
	const { jobItems, isLoading, totalJobCount } =
		useJobItems(debouncedSearchText);

	return (
		<>
			<Background />
			<Header searchText={searchText} setSearchText={setSearchText} />
			<Container
				jobItems={jobItems}
				isLoading={isLoading}
				totalJobCount={totalJobCount}
			/>
			<Footer />
		</>
	);
}

export default App;

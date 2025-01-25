import { useState } from "react";
import Background from "./components/Background";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useDisplayedItem, useJobItems, useParamId } from "./lib/hooks";

function App() {
	const [searchText, setSearchText] = useState("");
	const paramId = useParamId();
	const { jobItems, isLoading } = useJobItems(searchText);
	const displayedItem = useDisplayedItem(paramId);

	return (
		<>
			<Background />
			<Header searchText={searchText} setSearchText={setSearchText} />
			<Container
				jobItems={jobItems}
				isLoading={isLoading}
				displayedItem={displayedItem}
			/>
			<Footer />
		</>
	);
}

export default App;

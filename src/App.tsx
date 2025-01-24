import { useEffect, useState } from "react";
import Background from "./components/Background";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { useJobItems } from "./lib/hooks";

function App() {
	const [searchText, setSearchText] = useState("");
	const [param, setParam] = useState<number | null>(null);
	const { jobItems, isLoading } = useJobItems(searchText);

	useEffect(() => {
		const handleHashChange = () => {
			const id = +window.location.hash.slice(1);
			setParam(id);
		};
		handleHashChange();
		window.addEventListener("hashchange", handleHashChange);

		return () => {
			window.removeEventListener("hashchange", handleHashChange);
		};
	}, []);
	return (
		<>
			<Background />
			<Header searchText={searchText} setSearchText={setSearchText} />
			<Container jobItems={jobItems} isLoading={isLoading} />
			<Footer />
		</>
	);
}

export default App;

import { useEffect, useState } from "react";
import Background from "./components/Background";
import Container from "./components/Container";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
	const [jobItems, setJobItems] = useState([]);
	const [searchText, setSearchText] = useState("");

	useEffect(() => {
		if (!searchText) return;

		const fetchData = async () => {
			const res = await fetch(
				`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
			);
			const data = await res.json();
			setJobItems(data.jobItems);
		};
		fetchData();
	}, [searchText]);

	return (
		<>
			<Background />
			<Header searchText={searchText} setSearchText={setSearchText} />
			<Container jobItems={jobItems} />
			<Footer />
		</>
	);
}

export default App;

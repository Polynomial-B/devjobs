import { useEffect, useState } from "react";

export default function SearchForm() {
	const [searchText, setSearchText] = useState("");
	const [jobItems, setJobItems] = useState("");
	console.log(jobItems);

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
		<form action="#" className="search">
			<button type="submit">
				<i className="fa-solid fa-magnifying-glass"></i>
			</button>

			<input
				value={searchText}
				onChange={(e) => {
					setSearchText(e.target.value);
				}}
				spellCheck="false"
				type="text"
				required
				placeholder="Find developer jobs.."
			/>
		</form>
	);
}

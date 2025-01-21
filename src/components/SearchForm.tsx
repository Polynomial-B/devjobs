import { HeaderProps } from "../lib/types";

export default function SearchForm({ searchText, setSearchText }: HeaderProps) {
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

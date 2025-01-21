import { HeaderProps } from "../lib/types";
import BookmarksButton from "./BookmarksButton";
import Logo from "./Logo";
import SearchForm from "./SearchForm";

export default function Header({ searchText, setSearchText }: HeaderProps) {
	return (
		<header className="header">
			<div className="header__top">
				<Logo />
				<BookmarksButton />
			</div>
			<SearchForm searchText={searchText} setSearchText={setSearchText} />
		</header>
	);
}

import { HeartFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { BookmarksContext } from "../contexts/BookmarksContext";

export default function BookmarkIcon({ id }: { id: number }) {
	const context = useContext(BookmarksContext);
	const { bookmarkedIDs, handleToggleBookmark } = context;

	return (
		<button
			className="bookmark-btn"
			onClick={(e: React.MouseEvent<HTMLElement>) => {
				e.preventDefault();
				handleToggleBookmark(id);
				e.stopPropagation();
			}}
		>
			<HeartFilledIcon
				className={bookmarkedIDs.includes(id) ? "filled" : ""}
			/>
		</button>
	);
}

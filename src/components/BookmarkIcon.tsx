import { HeartFilledIcon } from "@radix-ui/react-icons";
import { useBookmarksContext } from "../lib/hooks";

export default function BookmarkIcon({ id }: { id: number }) {
	const { bookmarkedIDs, handleToggleBookmark } = useBookmarksContext();
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

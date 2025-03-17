import { HeartIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useState } from "react";

export default function BookmarksButton() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<section>
			<button
				className="bookmarks-btn"
				onClick={() => setIsOpen(!isOpen)}
			>
				Bookmarks <HeartIcon />
			</button>
			{isOpen && <BookmarksPopover />}
		</section>
	);
}

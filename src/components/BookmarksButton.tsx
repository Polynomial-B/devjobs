import { HeartIcon } from "@radix-ui/react-icons";

export default function BookmarksButton() {
	return (
		<section>
			<button className="bookmarks-btn">
				Bookmarks <HeartIcon />
			</button>
		</section>
	);
}

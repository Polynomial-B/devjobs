import { useJobItemsContext } from "../lib/hooks";
import { SortingButtonProps } from "../lib/types";

export default function SortingControls() {
	const { sortBy, handleSortBy } = useJobItemsContext();
	return (
		<section className="sorting">
			<i className="fa-solid fa-arrow-down-short-wide"></i>
			<SortingButton
				sortBy={sortBy}
				onClick={(e: React.MouseEvent<HTMLElement>) => {
					if (handleSortBy) {
						handleSortBy("relevant");
						(e.target as HTMLElement).blur();
					}
				}}
			>
				relevant
			</SortingButton>
			<SortingButton
				sortBy={sortBy}
				onClick={(e: React.MouseEvent<HTMLElement>) => {
					if (handleSortBy) {
						handleSortBy("recent");
						(e.target as HTMLElement).blur();
					}
				}}
			>
				recent
			</SortingButton>
		</section>
	);
}

function SortingButton({ children, onClick, sortBy }: SortingButtonProps) {
	return (
		<button
			className={`sorting__button sorting__button--${
				sortBy === children ? "active" : children
			}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
}

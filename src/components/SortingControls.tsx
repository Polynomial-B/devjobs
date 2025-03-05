import { ContainerProps } from "../lib/types";

export default function SortingControls({
	handleSortBy,
	sortBy,
}: ContainerProps) {
	return (
		<section className="sorting">
			<i className="fa-solid fa-arrow-down-short-wide"></i>

			<button
				className={`sorting__button sorting__button--${
					sortBy === "relevant" ? "active" : "relevant"
				}`}
				onClick={(e: React.MouseEvent<HTMLElement>) => {
					if (handleSortBy) {
						handleSortBy("relevant");
						(e.target as HTMLElement).blur();
					}
				}}
			>
				Relevant
			</button>

			<button
				className={`sorting__button sorting__button--${
					sortBy === "recent" ? "active" : "relevant"
				}`}
				onClick={(e: React.MouseEvent<HTMLElement>) => {
					if (handleSortBy) {
						handleSortBy("recent");
						(e.target as HTMLElement).blur();
					}
				}}
			>
				Recent
			</button>
		</section>
	);
}

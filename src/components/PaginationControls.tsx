import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { useJobItemsContext } from "../lib/hooks";

export default function PaginationControls() {
	const { currentPage, handleChangePage, totalPageNumber } =
		useJobItemsContext();

	return (
		<section className="pagination">
			<button
				className={
					(currentPage ?? 0) > 1
						? `pagination__button`
						: "pagination__button--hidden"
				}
				onClick={
					currentPage !== 1
						? (e: React.MouseEvent<HTMLElement>) => {
								if (handleChangePage) {
									handleChangePage("previous");
									(e.target as HTMLElement).blur();
								}
						  }
						: undefined
				}
			>
				<>
					<ArrowLeftIcon />
					Page {String((currentPage ?? 0) - 1)}
				</>
			</button>
			<button
				className={
					(totalPageNumber ?? 0) >= (currentPage ?? 0)
						? "pagination__button"
						: "pagination__button--hidden"
				}
				onClick={(e: React.MouseEvent<HTMLElement>) => {
					if (handleChangePage) {
						handleChangePage("next");
						(e.target as HTMLElement).blur();
					}
				}}
			>
				Page {String((currentPage ?? 0) + 1)}
				<ArrowRightIcon />
			</button>
		</section>
	);
}

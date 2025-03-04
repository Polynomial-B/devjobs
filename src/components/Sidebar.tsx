import { ContainerProps } from "../lib/types";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";

export default function Sidebar({
	jobItems,
	isLoading,
	totalJobCount,
	handleChangePage,
	currentPage,
	totalPageNumber,
}: ContainerProps) {
	return (
		<div className="sidebar">
			<div className="sidebar__top">
				<ResultsCount totalJobCount={totalJobCount} />
				<SortingControls />
			</div>
			<JobList jobItems={jobItems} isLoading={isLoading} />
			<PaginationControls
				handleChangePage={handleChangePage}
				currentPage={currentPage}
				totalPageNumber={totalPageNumber}
			/>
		</div>
	);
}

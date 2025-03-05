import { ContainerProps } from "../lib/types";
import JobItemContent from "./JobItemContent";
import Sidebar from "./Sidebar";

export default function Container({
	jobItems,
	isLoading,
	totalJobCount,
	handleChangePage,
	currentPage,
	totalPageNumber,
	handleSortBy,
	sortBy,
}: ContainerProps) {
	return (
		<div className="container">
			<Sidebar
				jobItems={jobItems}
				isLoading={isLoading}
				totalJobCount={totalJobCount}
				handleChangePage={handleChangePage}
				currentPage={currentPage}
				totalPageNumber={totalPageNumber}
				handleSortBy={handleSortBy}
				sortBy={sortBy}
			/>
			<JobItemContent />
		</div>
	);
}

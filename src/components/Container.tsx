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
			/>
			<JobItemContent />
		</div>
	);
}

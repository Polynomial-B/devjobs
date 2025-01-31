import { ContainerProps } from "../lib/types";
import JobItemContent from "./JobItemContent";
import Sidebar from "./Sidebar";

export default function Container({
	jobItems,
	isLoading,
	totalJobCount,
}: ContainerProps) {
	return (
		<div className="container">
			<Sidebar
				jobItems={jobItems}
				isLoading={isLoading}
				totalJobCount={totalJobCount}
			/>
			<JobItemContent />
		</div>
	);
}

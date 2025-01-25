import { ContainerProps } from "../lib/types";
import JobItemContent from "./JobItemContent";
import Sidebar from "./Sidebar";

export default function Container({
	jobItems,
	isLoading,
	displayedItem,
}: ContainerProps) {
	return (
		<div className="container">
			<Sidebar jobItems={jobItems} isLoading={isLoading} />
			<JobItemContent displayedItem={displayedItem} />
		</div>
	);
}

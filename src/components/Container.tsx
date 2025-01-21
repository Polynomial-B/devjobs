import { JobItemsProps } from "../lib/types";
import JobItemContent from "./JobItemContent";
import Sidebar from "./Sidebar";

export default function Container({ jobItems }: JobItemsProps) {
	return (
		<div className="container">
			<Sidebar jobItems={jobItems} />
			<JobItemContent />
		</div>
	);
}

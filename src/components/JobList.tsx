import { JobItemsProps } from "../lib/types";
import JobListItem from "./JobListItem";

export function JobList({ jobItems }: JobItemsProps) {
	return (
		<ul className="job-list">
			{jobItems.map((jobItem) => {
				return <JobListItem jobItem={jobItem} />;
			})}
		</ul>
	);
}

export default JobList;

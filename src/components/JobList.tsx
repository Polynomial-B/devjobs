import { JobItems, JobItemsProps } from "../lib/types";
import JobListItem from "./JobListItem";

export function JobList({ jobItems }: JobItemsProps) {
	if (Array.isArray(jobItems)) {
		return (
			<ul className="job-list">
				{jobItems.map((jobItem: JobItems) => {
					return <JobListItem jobItems={jobItem} />;
				})}
			</ul>
		);
	}
}

export default JobList;

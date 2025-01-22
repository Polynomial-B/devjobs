import { ContainerProps, JobItems } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

export function JobList({ jobItems, isLoading }: ContainerProps) {
	if (isLoading) {
		return (
			<ul className="job-list">
				<Spinner />
			</ul>
		);
	}

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

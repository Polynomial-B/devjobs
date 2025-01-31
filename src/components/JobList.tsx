import { useParamId } from "../lib/hooks";
import { ContainerProps, JobItems } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

export function JobList({ jobItems, isLoading }: ContainerProps) {
	const paramId = useParamId();
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
					return (
						<JobListItem
							key={jobItem.id}
							jobItems={jobItem}
							isActive={jobItem.id == paramId}
						/>
					);
				})}
			</ul>
		);
	}
}

export default JobList;

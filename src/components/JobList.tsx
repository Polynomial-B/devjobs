import { useActiveIDContext } from "../lib/hooks";
import { ContainerProps, JobItems } from "../lib/types";
import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

export function JobList({ jobItems, isLoading }: ContainerProps) {
	const { paramId } = useActiveIDContext();
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
							id={jobItem.id}
						/>
					);
				})}
			</ul>
		);
	}
}

export default JobList;

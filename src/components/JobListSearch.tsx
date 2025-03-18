import { useJobItemsContext } from "../lib/hooks";
import JobList from "./JobList";

export default function JobListSearch() {
	const { slicedJobItems, isLoading } = useJobItemsContext();
	return <JobList jobItems={slicedJobItems} isLoading={isLoading} />;
}

import { useJobItemsContext } from "../lib/hooks";

export default function ResultsCount() {
	const { totalJobCount } = useJobItemsContext();
	return (
		<p className="count">
			<span className="u-bold">{totalJobCount}</span> results
		</p>
	);
}

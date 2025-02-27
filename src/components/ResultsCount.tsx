import { ContainerProps } from "../lib/types";

export default function ResultsCount({ totalJobCount }: ContainerProps) {
	return (
		<p className="count">
			<span className="u-bold">{totalJobCount}</span> results
		</p>
	);
}

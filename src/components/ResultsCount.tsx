import { ContainerProps } from "../lib/types";

export default function ResultsCount({ totalJobCount }: ContainerProps) {
	return <p className="count">{totalJobCount} results</p>;
}

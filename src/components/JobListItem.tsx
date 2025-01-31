import { JobItemsProps } from "../lib/types";
import BookmarkIcon from "./BookmarkIcon";

export default function JobListItem({ jobItems, isActive }: JobItemsProps) {
	return (
		<li className={`job-item ${isActive && "job-item--active"}`}>
			<a className="job-item__link" href={`#${jobItems.id}`}>
				<div className="job-item__badge">{jobItems.badgeLetters}</div>

				<div className="job-item__middle">
					<h3 className="third-heading">{jobItems.title}</h3>
					<p className="job-item__company">{jobItems.company}</p>
				</div>

				<div className="job-item__right">
					<BookmarkIcon />
					<time className="job-item__time">{jobItems.daysAgo}d</time>
				</div>
			</a>
		</li>
	);
}

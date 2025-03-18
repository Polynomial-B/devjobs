import { useActiveIDContext, useDisplayedItem } from "../lib/hooks";
import BookmarkIcon from "./BookmarkIcon";
import Spinner from "./Spinner";

export default function JobItemContent() {
	const { paramId } = useActiveIDContext();
	const [displayedItem, isLoading] = useDisplayedItem(paramId);

	if (isLoading) {
		return (
			<section className="job-details">
				<div>
					<Spinner />
				</div>
			</section>
		);
	}
	if (!displayedItem) {
		return <EmptyJobContent />;
	}

	return (
		<section className="job-details">
			<div>
				<img src={displayedItem.coverImgURL} alt="#" />

				<a
					className="apply-btn"
					href={displayedItem.companyURL}
					target="_blank"
				>
					Apply
				</a>

				<section className="job-info">
					<div className="job-info__left">
						<div className="job-info__badge">
							{displayedItem.badgeLetters}
						</div>
						<div className="job-info__below-badge">
							<time className="job-info__time">{`${displayedItem.daysAgo}d`}</time>

							<BookmarkIcon id={displayedItem.id} />
						</div>
					</div>

					<div className="job-info__right">
						<h2 className="second-heading">
							{displayedItem.title}
						</h2>
						<p className="job-info__company">
							{displayedItem.company}
						</p>
						<p className="job-info__description">
							{displayedItem.description}
						</p>
						<div className="job-info__extras">
							<p className="job-info__extra">
								<i className="fa-solid fa-clock job-info__extra-icon"></i>
								{displayedItem.duration}
							</p>
							<p className="job-info__extra">
								<i className="fa-solid fa-money-bill job-info__extra-icon"></i>
								{displayedItem.salary}
							</p>
							<p className="job-info__extra">
								<i className="fa-solid fa-location-dot job-info__extra-icon"></i>{" "}
								{displayedItem.location}
							</p>
						</div>
					</div>
				</section>

				<div className="job-details__other">
					<section className="qualifications">
						<div className="qualifications__left">
							<h4 className="fourth-heading">Qualifications</h4>
							<p className="qualifications__sub-text">
								Other qualifications may apply
							</p>
						</div>
						<ul className="qualifications__list">
							{displayedItem.qualifications.map((item) => {
								return (
									<li
										className="qualifications__item"
										key={item}
									>
										{item}
									</li>
								);
							})}
						</ul>
					</section>

					<section className="reviews">
						<div className="reviews__left">
							<h4 className="fourth-heading">Company reviews</h4>
							<p className="reviews__sub-text">
								{displayedItem.reviews.length > 0
									? "Here are peoples' thoughts"
									: " Currently no reviews!"}
							</p>
						</div>
						{displayedItem.reviews.length > 0 ? (
							<ul className="reviews__list">
								{displayedItem.reviews.map((review) => {
									return (
										<li
											key={review}
											className="reviews__item"
										>
											{review}
										</li>
									);
								})}
							</ul>
						) : (
							""
						)}
					</section>
				</div>
			</div>
		</section>
	);
}

function EmptyJobContent() {
	return (
		<section className="job-details">
			<div>
				<div className="job-details__start-view">
					<p>What are you looking for?</p>
					<p>Start by searching using the task bar above.</p>
				</div>
			</div>
		</section>
	);
}

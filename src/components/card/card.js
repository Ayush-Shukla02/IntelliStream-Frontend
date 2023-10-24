import React, { useContext, useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./card.css";
import { useNavigate } from "react-router-dom";
import { lambdaUserInteractionURL } from "../../api";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const Cards = ({ movie }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [interaction, setInteraction] = useState(null);
	const { userId } = useContext(AuthContext);

	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
	}, []);

	const updateInteraction = async () => {
		console.log("updating the interaction", interaction);

		try {
			const response = await axios.get(
				`${lambdaUserInteractionURL}?tmdbId=${
					movie.id
				}&userId=${userId}&event_type=${interaction}&timestamp=${Date.now()}`
			);

			console.log(response);
		} catch (error) {
			console.error("Error updating interaction:", error);
		}

		navigate(`/movie/${movie.id}`, { replace: true });
	};

	useEffect(() => {
		if (interaction) {
			updateInteraction();
		}
	}, [interaction]);

	return (
		<>
			{isLoading ? (
				<div className="cards">
					<SkeletonTheme color="#202020" highlightColor="#444">
						<Skeleton height={300} duration={2} />
					</SkeletonTheme>
				</div>
			) : (
				<div
					style={{ textDecoration: "none", color: "white" }}
					onClick={() => setInteraction("click")}
				>
					<div className="cards">
						<img
							className="cards__img"
							src={`https://image.tmdb.org/t/p/original${
								movie ? movie.poster_path : ""
							}`}
						/>
						<div className="cards__overlay">
							<div className="card__title">
								{movie ? movie.original_title : ""}
							</div>
							<div className="card__runtime">
								{movie ? movie.release_date : ""}
								<span className="card__rating">
									{movie ? movie.vote_average : ""}
									<i className="fas fa-star" />
								</span>
							</div>
							<div className="card__description">
								{movie
									? movie.overview.slice(0, 118) + "..."
									: ""}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Cards;

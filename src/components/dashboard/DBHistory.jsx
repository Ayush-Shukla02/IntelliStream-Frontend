import React, { useContext, useEffect, useState } from "react";
import Cards from "../card/card";
import "./dashboard.css";
import AuthContext from "../../context/AuthContext";
import { lambdaStatsURL } from "../../api";
import axios from "axios";

const DBHistory = () => {
	const { User, userId } = useContext(AuthContext);

	const [recentMovies, setRecentMovies] = useState(null);
	const [historyMovies, setHistoryMovies] = useState([]);

	const fetchMovies = async () => {
		const fetchPromises = recentMovies.map((movie) => {
			const tmdbId = movie.tmdbId.toString().split(".")[0];

			return fetch(
				`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
			).then((res) => res.json());
		});

		const movies = await Promise.all(fetchPromises);
		console.log("movies: ", movies);

		setHistoryMovies(movies);
	};

	const fetchRecent = async () => {
		try {
			const response = await axios.get(
				`${lambdaStatsURL}?userId=${userId}`
			);
			const data = response.data;
			console.log(data.recent_movies);
			setRecentMovies(data.recent_movies);
		} catch (error) {
			console.error("Error fetching movies in history:", error);
		}
	};

	useEffect(() => {
		if (userId && !recentMovies) {
			fetchRecent();
		}
		if (recentMovies) {
			console.log("Recent Movies:", recentMovies);
			fetchMovies();
		}

		if (historyMovies.length > 0) {
			console.log("History Movies:", historyMovies);
		}
	}, [userId, recentMovies]);

	return (
		<div className="flex items-center justify-center flex-col pt-6 w-full gap-4">
			{User ? (
				historyMovies.length > 0 ? (
					<>
						<h1 className="text-[50px] text-white font-semibold">
							Your Watch History
						</h1>
						<div
							style={{ marginLeft: "9rem" }}
							className="movie__list"
						>
							<div className="list__cards">
								{historyMovies.map((movie) => (
									<Cards key={movie.id} movie={movie} />
								))}
							</div>
						</div>
					</>
				) : (
					<>
						<h1 className="text-[50px] text-white font-semibold">
							Watch something to show your history here.
						</h1>
					</>
				)
			) : (
				<h1 className="text-[50px] text-white font-semibold">
					Sign in to view your history.
				</h1>
			)}
		</div>
	);
};

export default DBHistory;

import React, { useContext, useEffect, useState } from "react";
import Cards from "../card/card";
import "./dashboard.css";
import AuthContext from "../../context/AuthContext";
import { lambdaGenreURL } from "../../api";
import axios from "axios";

const DBHistory = () => {
	let { User, userId } = useContext(AuthContext);

	const [historyMovies, setHistoryMovies] = useState([]);

	const fetchMovies = async () => {
		try {
			// console.log("userId: ", userId);
			const response = await axios.get(
				`${lambdaGenreURL}?userId=${userId}`
			);
			const data = response.data;

			// console.log("response received: ", data);

			// const fetchPromises = data.map((movie) => {
			// 	const tmdbId = movie.tmdbId.toString().split(".")[0];

			// 	return fetch(
			// 		`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
			// 	).then((res) => res.json());
			// });

			// const movies = await Promise.all(fetchPromises);
			// console.log("movies: ", movies);

			// setHistoryMovies(movies);
		} catch (error) {
			console.error("Error fetching movies:", error);
		}
	};

	useEffect(() => {
		if (userId) {
			fetchMovies();
		}
	}, [userId]);

	return (
		<div className="flex items-center justify-center flex-col pt-6 w-full gap-4">
			{historyMovies.length > 0 ? (
				<>
					<h1 className="text-[50px] text-white font-semibold">
						Your Watch History
					</h1>
					<div className="movie__list">
						<h2 className="list__title">FOR YOU</h2>
						<div className="list__cards">
							{historyMovies.map((movie) => (
								<Cards movie={movie} />
							))}
						</div>
					</div>
				</>
			) : (
				<>
					<h1 className="text-[50px] text-white font-semibold">
						Watch something to show you history here.
					</h1>
				</>
			)}
		</div>
	);
};

export default DBHistory;

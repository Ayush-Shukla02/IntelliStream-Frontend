import React, { useEffect, useState } from "react";
import "./movieList.css";
import Cards from "../card/card";

const MovieList = ({ type }) => {
	const [movieList, setMovieList] = useState([]);

	useEffect(() => {
		getData();
	}, [type]);

	const getData = () => {
		fetch(
			`https://api.themoviedb.org/3/movie/${type}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
		)
			.then((res) => res.json())
			.then((data) => {
				if (data.results) {
					setMovieList(data.results);
				}
			})
			.catch((error) => {
				console.error("Error fetching data:", error);
			});
	};

	return (
		<div className="movie__list">
			<h2 className="list__title">{type.toUpperCase()}</h2>
			<div className="list__cards">
				{movieList.map((movie) => (
					<Cards movie={movie} />
				))}
			</div>
		</div>
	);
};

export default MovieList;

import React, { useEffect, useState } from "react";
import Header from "./Header";
import LoginInput from "./LoginInput";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import Cards from "./card/card";
import { BiSearchAlt2 } from "react-icons/bi";

function SearchComponent() {
	const [genre, setGenre] = useState(null);
	const [movies, setMovies] = useState(null);

	const genreMap = {
		Action: "28",
		Adventure: "12",
		Animation: "16",
		Comedy: "35",
		Crime: "80",
		Documentary: "99",
		Drama: "18",
		Family: "10751",
		Fantasy: "14",
		History: "36",
		Horror: "27",
		Music: "10402",
		Mystery: "9648",
		Romance: "10749",
		"Science Fiction": "878",
		"TV Movie": "10770",
		Thriller: "53",
		War: "10752",
		Western: "37",
	};

	const genreId = genreMap[genre];
	// console.log("Genre id is : ", genreId);

	const fetchMovies = async () => {
		fetch(
			`https://api.themoviedb.org/3/discover/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&with_genres=${genreId}`
		)
			.then((res) => res.json())
			.then((data) => setMovies(data.results));

		if (movies) {
			console.log(movies);
		}
	};

	const handleSearch = (event) => {
		event.preventDefault();

		// genreId = genreMap[genre];

		fetchMovies();

		// if (genreId === undefined) {
		// 	setMovies(null);
		// }
	};
	// color: rgb(255, 77, 0);
	return (
		<div className="flex flex-col">
			<Header />
			<div className="flex items-center justify-start mt-24 ">
				<div className="w-[37%] m-2 p-2">
					<LoginInput
						placeholder={"Search genre here"}
						icon={
							<BiSearchAlt2 className="text-xl text-gray-300" />
						}
						inputState={genre}
						inputStateFunc={setGenre}
						type="text"
					/>
				</div>
				<motion.button
					{...buttonClick}
					className="w-[7%] px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-156"
					style={{ background: "rgb(230, 51, 0)" }}
					onClick={handleSearch}
				>
					Search
				</motion.button>
			</div>
			<div className="movie__list">
				{movies ? (
					<>
						<h2 className="list__title">SEARCH RESULTS</h2>
						<div className="list__cards">
							{movies.map((movie) => (
								<Cards movie={movie} />
							))}
						</div>
					</>
				) : (
					<h2 className="list__title">
						Search for Genre to show results here
					</h2>
				)}
			</div>
		</div>
	);
}

export default SearchComponent;

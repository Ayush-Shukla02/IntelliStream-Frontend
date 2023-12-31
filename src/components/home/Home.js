import React, { useEffect, useState, useContext } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../movieList/movieList";
import Header from "../Header";
import { lambdaMovieURL, lambdaUserURL, lambdaGetUserMoodURL } from "../../api";
import axios from "axios";
import Cards from "../card/card";
import AuthContext from "../../context/AuthContext";

const Home = () => {
	const [popularMovies, setPopularMovies] = useState([]);
	const [forYouMovies, setForYouMovies] = useState([]);
	const [userId, setUserId] = useState(null);
	// const [userName, setUserName] = useState(null);
	const { storeUserId, storeUserMood } = useContext(AuthContext);

	const { User } = useContext(AuthContext);

	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
		)
			.then((res) => res.json())
			.then((data) => setPopularMovies(data.results));
	}, []);

	const getUser = async (userName) => {
		const response = await axios.get(`${lambdaUserURL}?userId=${userName}`);

		storeUserId(response.data.split(": ")[1]);
		setUserId(response.data.split(": ")[1]);
	};

	const fetchMovies = async () => {
		try {
			const response = await axios.get(
				`${lambdaMovieURL}?userId=${userId}`
			);
			const data = response.data;

			const fetchPromises = data.map((movie) => {
				const tmdbId = movie.tmdbId.toString().split(".")[0];

				return fetch(
					`https://api.themoviedb.org/3/movie/${tmdbId}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
				).then((res) => res.json());
			});

			const movies = await Promise.all(fetchPromises);

			setForYouMovies(movies);
		} catch (error) {
			console.error("Error fetching movies:", error);
		}
	};

	const fetchMood = async () => {
		try {
			const response = await axios.get(
				`${lambdaGetUserMoodURL}?userId=${userId}`
			);
			const data = response.data;
			storeUserMood(data);
			// console.log("mood is :", data);
		} catch (error) {
			console.error("Error fetching Mood:", error);
		}
	};

	useEffect(() => {
		if (User && !userId) {
			console.log(
				"user at home: ",
				User.split(",")[0].split(":")[1].split('"')[1]
			);
			// setUserName(User.split(",")[0].split(":")[1].split('"')[1]);
			getUser(User.split(",")[0].split(":")[1].split('"')[1]);
		} else if (userId) {
			console.log("UserId: ", userId);
			fetchMovies();
			fetchMood();
		}
	}, [User, userId]);

	return (
		<>
			<Header />
			<div className="poster">
				<Carousel
					showThumbs={false}
					autoPlay={true}
					transitionTime={3}
					infiniteLoop={true}
					showStatus={false}
				>
					{popularMovies.map((movie) => (
						<Link
							style={{ textDecoration: "none", color: "white" }}
							to={`/movie/${movie.id}`}
						>
							<div className="posterImage">
								<img
									src={`https://image.tmdb.org/t/p/original${
										movie && movie.backdrop_path
									}`}
								/>
							</div>
							<div className="posterImage__overlay">
								<div className="posterImage__title">
									{movie ? movie.original_title : ""}
								</div>
								<div className="posterImage__runtime">
									{movie ? movie.release_date : ""}
									<span className="posterImage__rating">
										{movie ? movie.vote_average : ""}
										<i className="fas fa-star" />{" "}
									</span>
								</div>
								<div className="posterImage__description">
									{movie ? movie.overview : ""}
								</div>
							</div>
						</Link>
					))}
				</Carousel>
				<div className="movie__list">
					<h2 className="list__title">FOR YOU</h2>
					{forYouMovies.length > 0 ? (
						<div className="list__cards">
							{forYouMovies.map((movie) => (
								<Cards movie={movie} />
							))}
						</div>
					) : (
						<div className="w-full items-center justify-center m-10 text-white text-2xl">
							Login to see your recommendations here...
						</div>
					)}
				</div>
				<MovieList type="popular" />
				<MovieList type="top_rated" />
			</div>
		</>
	);
};

export default Home;

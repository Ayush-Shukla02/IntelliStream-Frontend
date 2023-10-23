import React, { useEffect, useState, useContext} from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../movieList/movieList";
import Header from "../Header";
import { tmdbBaseURL, lambdaMovieURL, lambdaUserURL } from "../../api";
import axios from "axios";
import { useSelector } from "react-redux";
import Cards from "../card/card";
import  AuthContext from "../../context/AuthContext";

const Home = () => {
	const [popularMovies, setPopularMovies] = useState([]);
	const [forYouMovies, setForYouMovies] = useState([]);
	const [userId, setUserId] = useState("");
	const { storeUserId } = useContext(AuthContext);

	const user = useSelector((state) => state.user);
	console.log("user: ", user);

	useEffect(() => {
		fetch(
			"https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
		)
			.then((res) => res.json())
			.then((data) => setPopularMovies(data.results));
	}, []);

	useEffect(() => {
		const getUser = async () => {
			try {
				console.log("Username: ", user.username);
				const response = await axios.get(
					`${lambdaUserURL}?userId=${user.username}`
				);
				console.log("userId is:", response.data.split(": ")[1]);
				storeUserId(response.data.split(": ")[1]);
				setUserId(response.data.split(": ")[1]);
			} catch (error) { 	 
				console.error("Error fetching movies:", error);
			}
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
				console.log("movies: ", movies);

				setForYouMovies(movies);
			} catch (error) {
				console.error("Error fetching movies:", error);
			}
		};

		if (user) {
			getUser();
			fetchMovies();
		}
	}, []);

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
				<MovieList type="popular" />
				<MovieList type="top_rated" />
				<div className="movie__list">
					<h2 className="list__title">FOR YOU</h2>
					{forYouMovies.length > 0 ? (
						<div className="list__cards">
							{forYouMovies.map((movie) => (
								<Cards movie={movie} />
							))}
						</div>
					) : (
						"Login before you can see your recommendations"
					)}
				</div>
			</div>
		</>
	);
};

export default Home;

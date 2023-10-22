import React, { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Link } from "react-router-dom";
import MovieList from "../movieList/movieList";
import Header from "../Header";
import { tmdbBaseURL, lambdaURL } from "../../api";
import axios from "axios";
import { useSelector } from "react-redux";

const Home = () => {
	const [popularMovies, setPopularMovies] = useState([]);
	const [topRatedMovies, setTopRatedMovies] = useState([]);
	const [forYouMovies, setForYouMovies] = useState([]);

	const user = useSelector((state) => state.user);

	useEffect(() => {
		fetch(
			"https://api.themoviedb.org/3/movie/popular?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US"
		)
			.then((res) => res.json())
			.then((data) => setPopularMovies(data.results));
	}, []);

	// useEffect(() => {
	// 	fetch(
	// 		`${tmdbBaseURL}popular?api_key=${process.env.TMDB_API_KEY}&language=en-US`
	// 	)
	// 		.then((res) => res.json())
	// 		.then((data) => setPopularMovies(data.results));
	// }, []);

	// // TOP RATED
	// useEffect(() => {
	// 	fetch(
	// 		`${tmdbBaseURL}/popular?api_key=${process.env.TMDB_API_KEY}&language=en-US`
	// 	)
	// 		.then((res) => res.json())
	// 		.then((data) => setTopRatedMovies(data.results));
	// }, []);

	// // FOR YOU
	useEffect(() => {
	const fetchMovies = async () => {
		try {
			const data = await axios.get(`${lambdaURL}?userId=2`);
			console.log(data);
			// setForYouMovies(data);
		} catch (err) {
			console.log("Error in lambda: ", err);
		}
		// setForYouMovies(data.data);
	};


		fetchMovies();
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
			</div>
		</>
	);
};

export default Home;

import React, { useContext, useEffect, useState } from "react";
import "./movie.css";
import { useParams } from "react-router-dom";
import Header from "../Header";
import { motion } from "framer-motion";
import { buttonClick } from "../../animations";
import AuthContext from "../../context/AuthContext";
import axios from "axios";
import { BiSolidLike, BiSolidDislike, BiLogoImdb } from "react-icons/bi";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { lambdaUpdateInteractionURL } from "../../api";

const Movie = () => {
	const [currentMovieDetail, setMovie] = useState();
	const { id } = useParams();
	const [interaction, setInteraction] = useState(null);
	const { User, userId } = useContext(AuthContext);

	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");

	// useEffect(() => {
	// update the comments for the movieId to the database
	// }, [comments]);

	useEffect(() => {
		getData();
		window.scrollTo(0, 0);
	}, []);

	const getData = () => {
		fetch(
			`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
		)
			.then((res) => res.json())
			.then((data) => setMovie(data));
	};

	const updateInteraction = async () => {
		console.log("updating the interaction", interaction);

		try {
			const response = await axios.get(
				`${lambdaUpdateInteractionURL}?tmdbId=${id}&userId=${userId}&event_type=${interaction}&timestamp=${Date.now()}`
			);

			console.log(response);
		} catch (error) {
			console.error("Error updating interaction:", error);
		}
	};

	useEffect(() => {
		if (interaction) {
			updateInteraction();
		}
	}, [interaction]);

	const handleAddComment = () => {
		if (newComment) {
			const commentObject = {
				id: comments.length + 1, // You can use a more robust method for generating IDs
				text: newComment,
			};

			setComments([...comments, commentObject]);

			// Clear the input field
			setNewComment("");
		}
	};

	return (
		<div className="movie">
			<Header />
			<div className="movie__intro">
				<img
					className="movie__backdrop"
					src={`https://image.tmdb.org/t/p/original${
						currentMovieDetail
							? currentMovieDetail.backdrop_path
							: ""
					}`}
				/>
			</div>
			<div className="movie__detail">
				<div className="movie__detailLeft">
					<div className="movie__posterBox">
						<img
							className="movie__poster"
							src={`https://image.tmdb.org/t/p/original${
								currentMovieDetail
									? currentMovieDetail.poster_path
									: ""
							}`}
						/>
					</div>
				</div>
				<div className="movie__detailRight">
					<div className="movie__detailRightTop">
						<div className="movie__name">
							{currentMovieDetail
								? currentMovieDetail.original_title
								: ""}
						</div>
						<div className="movie__tagline">
							{currentMovieDetail
								? currentMovieDetail.tagline
								: ""}
						</div>
						<div className="movie__rating">
							{currentMovieDetail
								? currentMovieDetail.vote_average
								: ""}{" "}
							<i class="fas fa-star" />
							<span className="movie__voteCount">
								{currentMovieDetail
									? "(" +
									  currentMovieDetail.vote_count +
									  ") votes"
									: ""}
							</span>
						</div>
						<div className="movie__runtime">
							{currentMovieDetail
								? currentMovieDetail.runtime + " mins"
								: ""}
						</div>
						<div className="movie__releaseDate">
							{currentMovieDetail
								? "Release date: " +
								  currentMovieDetail.release_date
								: ""}
						</div>
						<div className="movie__genres">
							{currentMovieDetail && currentMovieDetail.genres
								? currentMovieDetail.genres.map((genre) => (
										<>
											<span
												className="movie__genre"
												id={genre.id}
											>
												{genre.name}
											</span>
										</>
								  ))
								: ""}
						</div>
					</div>
					<div className="movie__detailRightBottom">
						<div className="synopsisText">Synopsis</div>
						<div>
							{currentMovieDetail
								? currentMovieDetail.overview
								: ""}
						</div>
					</div>
				</div>
			</div>
			<div className="flex align-center w-[75%] h-20 gap-4 mb-20">
				<div className="flex items-center text-white text-3xl w-[20%]">
					Your Thoughts
				</div>
				<div className="flex gap-2 w-full justify-around">
					<motion.button
						{...buttonClick}
						className="w-[15%] px-4 py-2 rounded-3xl bg-green-400 cursor-pointer text-white text-xl capitalize hover:bg-green-600 transition-all duration-156"
						onClick={() => setInteraction("like")}
					>
						<BiSolidLike className="text-green-100 text-4xl w-full" />
					</motion.button>
					<motion.button
						{...buttonClick}
						className="w-[15%] px-4 py-2  rounded-3xl bg-red-500 cursor-pointer text-white text-xl capitalize hover:bg-red-600 transition-all duration-156"
						onClick={() => setInteraction("dislike")}
					>
						<BiSolidDislike className="text-red-100 text-4xl w-full" />
					</motion.button>
					<motion.button
						{...buttonClick}
						className="w-[15%] px-4 py-2 rounded-3xl bg-blue-400 cursor-pointer text-white text-xl capitalize hover:bg-blue-500 transition-all duration-156"
						onClick={() => setInteraction("watch")}
					>
						<BsFillPlayCircleFill className="text-blue-100 text-4xl w-full" />
					</motion.button>
					{currentMovieDetail && currentMovieDetail.imdb_id && (
						<a
							href={
								"https://www.imdb.com/title/" +
								currentMovieDetail.imdb_id
							}
							target="_blank"
							className="flex justify-center items-center w-[15%] px-4 py-2 rounded-3xl bg-yellow-400 cursor-pointer text-white text-xl capitalize hover:bg-yellow-500 transition-all duration-156"
						>
							<BiLogoImdb className="text-black text-5xl w-full" />
						</a>
					)}
				</div>
			</div>
			<div className="flex flex-col items-center w-[75%] gap-6">
				<div className="flex flex-col items-center w-full gap-6">
					<div className="flex flex-start w-full text-white text-3xl">
						Reviews
					</div>
					<div className="flex flex-col w-full gap-3 justify-center items-center">
						<textarea
							className="w-[75%] p-2 border rounded-2xl"
							placeholder="Add a comment..."
							value={newComment}
							onChange={(e) => setNewComment(e.target.value)}
						></textarea>
						<button
							className="bg-blue-500 text-white p-2 rounded-2xl w-[10%] hover:bg-blue-600"
							onClick={handleAddComment}
						>
							Post
						</button>
					</div>
				</div>
				<div className="flex flex-col items-start w-[75%] gap-3">
					{comments.map((comment) => (
						<div
							key={comment.id}
							className="bg-white p-4 shadow rounded-2xl"
						>
							{comment.text}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Movie;

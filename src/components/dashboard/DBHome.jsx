import React, { useContext, useEffect, useState } from "react";
import "./dashboard.css";
import AuthContext from "../../context/AuthContext";
import { lambdaGenreURL, lambdaUserInteractionURL } from "../../api";
import axios from "axios";
import { CChart } from "@coreui/react-chartjs";
import { BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { GiClick } from "react-icons/gi";
import { BsFillPlayCircleFill } from "react-icons/bs";

const DBHome = () => {
	const { User, userId } = useContext(AuthContext);
	const [data, setData] = useState({});
	const [interactionData, setInteractionData] = useState({});
	const [click, setClick] = useState(0);
	const [likes, setLikes] = useState(0);
	const [dislikes, setDislikes] = useState(0);
	const [watch, setWatch] = useState(0);

	const fetchMovies = async () => {
		try {
			const response = await axios.get(
				`${lambdaGenreURL}?userId=${userId}`
			);
			setData(response.data);

			const newResponse = await axios.get(
				`${lambdaUserInteractionURL}?userId=${userId}`
			);

			setInteractionData(newResponse.data.event_counts);

			// console.log("Movie data received: ", response.data);
			// console.log("Interaction response received: ", newResponse.data);

			// console.log("Movie data received: ", data);
			// console.log("Interaction response received: ", interactionData);
		} catch (error) {
			console.error("Error fetching movies:", error);
		}
	};

	useEffect(() => {
		if (userId) {
			fetchMovies();
		}
	}, [userId]);

	useEffect(() => {
		if (interactionData) {
			setWatch(interactionData["watch"]);
			setLikes(interactionData["like"]);
			setDislikes(interactionData["dislike"]);
			setClick(interactionData["click"]);
		}
	}, [interactionData]);

	const labels = [];
	const values = [];

	for (const key in data) {
		labels.push(key);
		values.push(data[key]);
	}

	return (
		<div className="flex items-center justify-center flex-col pt-6 w-full h-full">
			<div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 h-full">
				<div className="flex flex-col items-center justify-around m-10 p-10">
					<div className="flex w-full h-[40%] align-center justify-around gap-1">
						<div className="flex flex-col align-center justify-center w-[40%] gap-5 bg-green-400 rounded-3xl">
							<BiSolidLike className="text-green-100 text-7xl w-full" />
							<p className="flex justify-center text-green-100 text-5xl w-full">
								{likes}
							</p>
						</div>
						<div className="flex flex-col align-center justify-center w-[40%] gap-5 bg-red-400 rounded-3xl">
							<BiSolidDislike className="text-red-100 text-7xl w-full" />
							<p className="flex justify-center text-red-100 text-5xl w-full">
								{dislikes}
							</p>
						</div>
					</div>
					<div className="flex w-full h-[40%] align-center justify-around gap-3">
						<div className="flex flex-col align-center justify-center w-[40%] gap-5 bg-blue-400 rounded-3xl">
							<BsFillPlayCircleFill className="text-blue-100 text-7xl w-full" />
							<p className="flex justify-center text-blue-100 text-5xl w-full">
								{watch}
							</p>
						</div>
						<div className="flex flex-col align-center justify-center w-[40%] gap-5 bg-blue-300 rounded-3xl">
							<GiClick className="text-blue-100 text-7xl w-full" />
							<p className="flex justify-center text-blue-100 text-5xl w-full">
								{click}
							</p>
						</div>
					</div>
				</div>
				<div className="w-full h-full flex items-center justify-center">
					<div className="w-275 md:w-460">
						<CChart
							type="doughnut"
							data={{
								labels: labels,
								datasets: [
									{
										backgroundColor: [
											"#FFC285", // Light peach
											"#FF9933", // Classic orange
											"#FF6B33", // Reddish orange
											"#FF4500", // Darker deep orange
											"#2E8B57", // Sea green
											"#3CB371", // Medium sea green
											"#20B2AA", // Light sea green
											"#4682B4", // Steel blue
											"#5F9EA0", // Cadet blue
											"#00CED1", // Dark turquoise
											"#1E90FF", // Dodger blue
											"#6495ED", // Cornflower blue
											"#6B8E23", // Olive drab
											"#8FBC8F", // Dark sea green
											"#66CDAA", // Medium aquamarine
											"#00FA9A", // Medium spring green
											"#48D1CC", // Medium turquoise
											"#B0C4DE", // Light steel blue
											"#ADD8E6", // Light blue
											"#87CEFA", // Light sky blue
										],
										data: values,
									},
								],
							}}
							options={{
								plugins: {
									datalabels: {
										color: "white",
										font: {
											size: 16,
										},
									},
								},
								legend: {
									labels: {
										fontColor: "white",
										fontSize: 16,
									},
								},
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DBHome;

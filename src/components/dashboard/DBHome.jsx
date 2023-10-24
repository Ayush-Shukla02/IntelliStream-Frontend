import React, { useContext, useEffect, useState } from "react";
import "./dashboard.css";
import AuthContext from "../../context/AuthContext";
import { lambdaGenreURL } from "../../api";
import axios from "axios";
import { CChart } from "@coreui/react-chartjs";

const DBHome = () => {
	const { User, userId } = useContext(AuthContext);
	const [data, setData] = useState({});
	// console.log("user at history: ", User);
	// console.log("userid at history: ", userId);
	// console.log(typeof userId);

	const fetchMovies = async () => {
		try {
			// console.log("userId: ", userId);
			const response = await axios.get(
				`${lambdaGenreURL}?userId=${userId}`
			);
			setData(response.data);

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

	const labels = [];
	const values = [];

	for (const key in data) {
		labels.push(key);
		values.push(data[key]);
	}

	console.log(data);
	console.log(labels);
	console.log(values);

	// const drinks = products?.filter(
	// 	(item) => item.product_category === "drinks"
	// );
	// const deserts = products?.filter(
	// 	(item) => item.product_category === "deserts"
	// );
	// const fruits = products?.filter(
	// 	(item) => item.product_category === "fruits"
	// );
	// const rice = products?.filter((item) => item.product_category === "rice");
	// const curry = products?.filter((item) => item.product_category === "curry");
	// const chinese = products?.filter(
	// 	(item) => item.product_category === "chinese"
	// );
	// const bread = products?.filter((item) => item.product_category === "bread");

	return (
		<div className="flex items-center justify-center flex-col pt-6 w-full h-full">
			<div className="grid w-full grid-cols-1 md:grid-cols-2 gap-4 h-full">
				<div className="flex items-center justify-center">
					<div className="w-340 md:w-508">
						<CChart
							type="bar"
							data={{
								labels: labels,
								datasets: [
									{
										backgroundColor: [
											"#FFC285",  // Light peach
											"#FF9933",  // Classic orange
											"#FF6B33",  // Reddish orange
											"#FF4500",  // Darker deep orange
											"#2E8B57",  // Sea green
											"#3CB371",  // Medium sea green
											"#20B2AA",  // Light sea green
											"#4682B4",  // Steel blue
											"#5F9EA0",  // Cadet blue
											"#00CED1",  // Dark turquoise
											"#1E90FF",  // Dodger blue
											"#6495ED",  // Cornflower blue
											"#6B8E23",  // Olive drab
											"#8FBC8F",  // Dark sea green
											"#66CDAA",  // Medium aquamarine
											"#00FA9A",  // Medium spring green
											"#48D1CC",  // Medium turquoise
											"#B0C4DE",  // Light steel blue
											"#ADD8E6",  // Light blue
											"#87CEFA"   // Light sky blue
										],
										data: values,
									},
								],
							}}
							labels="months"
						/>
					</div>
				</div>
				<div className="w-full h-full flex items-center justify-center " style ={{background: "black"}} >
				<div className="w-275 md:w-460" >
						<CChart
							type="doughnut"
							data={{
								labels: labels,
								datasets: [
									{
										backgroundColor: [
											"#FFC285",  // Light peach
											"#FF9933",  // Classic orange
											"#FF6B33",  // Reddish orange
											"#FF4500",  // Darker deep orange
											"#2E8B57",  // Sea green
											"#3CB371",  // Medium sea green
											"#20B2AA",  // Light sea green
											"#4682B4",  // Steel blue
											"#5F9EA0",  // Cadet blue
											"#00CED1",  // Dark turquoise
											"#1E90FF",  // Dodger blue
											"#6495ED",  // Cornflower blue
											"#6B8E23",  // Olive drab
											"#8FBC8F",  // Dark sea green
											"#66CDAA",  // Medium aquamarine
											"#00FA9A",  // Medium spring green
											"#48D1CC",  // Medium turquoise
											"#B0C4DE",  // Light steel blue
											"#ADD8E6",  // Light blue
											"#87CEFA"   // Light sky blue
										]
										,
										data: values,
									},
								],
							}}
							options={{
								plugins: {
									datalabels: {
										color: 'white',
										font: {
											size: 16
										}
									}
								},
								legend: {
									labels: {
										fontColor: "white",
										fontSize: 16
									}
								}
							}}
						/>
					</div>

				</div>
			</div>
		</div>
	);
};

export default DBHome;

import React, { useEffect } from "react";
import Cards from "../card/card";
import "./dashboard.css";

const DBHistory = ({ movies }) => {
	// const orders = useSelector((state) => state.orders);
	// const dispatch = useDispatch();

	// useEffect(() => {
	// 	if (!orders) {
	// 		getAllOrders().then((data) => {
	// 			dispatch(setOrders(data));
	// 		});
	// 	}
	// }, []);

	return (
		<div className="flex items-center justify-center flex-col pt-6 w-full gap-4">
			{movies.length > 0 ? (
				<>
					<h1 className="text-[50px] text-white font-semibold">
						Your Watch History
					</h1>
					<div className="movie__list">
						<h2 className="list__title">FOR YOU</h2>
						<div className="list__cards">
							{movies.map((movie) => (
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

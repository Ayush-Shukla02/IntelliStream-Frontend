import React, { useEffect } from "react";
import { Header } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts, getAllUsers } from "../api";
import { setAllProducts } from "../context/actions/productActions";
import { setAllUsersDetails } from "../context/actions/allUsersAction";
import Home from "../components/home/Home";

const Main = () => {
	const products = useSelector((state) => state.products);
	const users = useSelector((state) => state.users);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!products) {
			getAllProducts().then((data) => {
				dispatch(setAllProducts(data));
			});
		}
	}, []);

	useEffect(() => {
		if (!users) {
			getAllUsers().then((data) => {
				dispatch(setAllUsersDetails(data));
			});
		}
	}, []);

	return (
		<main className="w-screen min-h-screen flex items-center justify-start flex-col bg-[#42325C]">
			<Header />
			{/* <div className="w-full flex flex-col items-start justify-center mt-40 px-6 gap-12 pb-15">
				<Home />
			</div> */}
		</main>
	);
};

export default Main;

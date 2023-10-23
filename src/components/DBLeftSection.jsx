import React from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";

const DBLeftSection = () => {
	return (
		<div className="h-full py-12 flex flex-col bg-lightOverlay backdrop-blur-md shadow-md minw-210 w-300 gap-3">
			<NavLink
				to={"/"}
				className="flex items-center justify-start px-6 gap-4"
			>
				<img src={Logo} alt="logo" className="w-12 rounded-full" />
				<p className="font-semibold text-xl">IntelliStream</p>
			</NavLink>
			<hr />
			<ul className="flex flex-col gap-4">
				<NavLink
					className={({ isActive }) =>
						isActive
							? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
							: isNotActiveStyles
					}
					to={"/dashboard/home"}
				>
					Home
				</NavLink>
				<NavLink
					className={({ isActive }) =>
						isActive
							? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
							: isNotActiveStyles
					}
					to={"/dashboard/history"}
				>
					History
				</NavLink>
			</ul>
		</div>
	);
};

export default DBLeftSection;

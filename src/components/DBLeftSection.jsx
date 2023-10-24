import React from "react";
import { NavLink } from "react-router-dom";
import { Logo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";

const DBLeftSection = () => {
	return (
		<div style={{display:"flex", flexDirection:"column", height:"100%", padding:"1rem",paddingTop:"1rem", backgroundImage: "linear-gradient(rgba(256, 256, 256, 0.2),rgb(0, 0, 0, 0))"}}>
			<NavLink
				to={"/"}
				className="flex items-center justify-start px-6 gap-4"
				style={{ padding:"1rem"}}
			>
				<img src={Logo} alt="logo" className="w-20 rounded-full"  />
				<p className="font-semibold text-2xl" style={{color:"#ff4d00"}}>IntelliStream</p>
			</NavLink>
			{/* <hr /> */}
			<ul className="flex flex-col gap-4">
				<NavLink
					className={({ isActive }) =>
						isActive
							? `${isActiveStyles} px-4 py-2 border-l-8 border-red-500`
							: isNotActiveStyles
					}
					to={"/dashboard/home"}
					style={{color:"#ff3300"}}
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
					style={{color:"#ff3300"}}
				>
					History
				</NavLink>
			</ul>
		</div>
	);
};

export default DBLeftSection;

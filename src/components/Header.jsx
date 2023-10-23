import React, { useState, useContext, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, Logo } from "../assets";
import { isActiveStyles, isNotActiveStyles } from "../utils/styles";
import { motion } from "framer-motion";
import { buttonClick, slideTop } from "../animations";
import { MdLogout } from "../assets/icons";
import { Auth } from "aws-amplify";
import AuthContext from "../context/AuthContext";

const Header = () => {
	const { User } = useContext(AuthContext);
	const { deleteUser } = useContext(AuthContext);

	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const navigate = useNavigate();

	const signOut = async () => {
		try {
			await Auth.signOut();
			navigate("/login", { replace: true });
			deleteUser();
			console.log("User signed out");
		} catch (error) {
			console.error("Error signing out: ", error);
		}
	};

	useEffect(() => {
		if (User) {
			console.log("user found: ", User);
		}
	}, [User]);

	return (
		<header className="fixed backdrop-blur-md z-50 inset-x-0 top-0 flex items-center justify-between px-12 md:px-20 py-6">
			<NavLink
				to={"/"}
				className="flex items-center justify-center gap-4"
			>
				<img src={Logo} alt="logo" className="w-12 rounded-full" />
				<p className="font-semibold text-xl">IntelliStream</p>
			</NavLink>

			<nav className="flex items-center justify-center gap-8">
				<ul className="hidden md:flex items-center justify-center gap-16">
					<NavLink
						className={({ isActive }) =>
							isActive ? isActiveStyles : isNotActiveStyles
						}
						to={"/"}
					>
						Home
					</NavLink>
					<NavLink
						className={({ isActive }) =>
							isActive ? isActiveStyles : isNotActiveStyles
						}
						to={"/search"}
					>
						Search
					</NavLink>
					<NavLink
						className={({ isActive }) =>
							isActive ? isActiveStyles : isNotActiveStyles
						}
						to={"/dashboard"}
					>
						Dashboard
					</NavLink>
				</ul>

				{User ? (
					<>
						<div
							className="relative cursor-pointer"
							onClick={() => setIsMenuOpen(true)}
							onMouseLeave={() => {
								setIsMenuOpen(false);
							}}
						>
							<div className="w-12 h-12 rounded-full shadow-md overflow-hidden cursor-pointer flex items-center justify-center">
								<motion.img
									className="w-full h-full object-cover"
									src={Avatar}
									whileHover={{ scale: 1.15 }}
									referrerPolicy="no-referrer"
								/>
							</div>
							{isMenuOpen && (
								<motion.div
									className="px-6 py-4 w-48 bg-lightOverlay backdrop-blur-md rounded-md shadow-md absolute top-12 right-0 flex flex-col gap-4"
									onMouseLeave={() => {
										setIsMenuOpen(false);
									}}
									{...slideTop}
								>
									<motion.div
										{...buttonClick}
										className="group flex items-center justify-center px-3 py-2 rounded-md shadow-md bg-gray-100 hover:bg-gray-200 gap-3"
										onClick={signOut}
									>
										<MdLogout className="text-2xl text-textColor group-hover:text-headingColor" />
										<p className="text-textColor text-xl group-hover:text-headingColor">
											Sign Out
										</p>
									</motion.div>
								</motion.div>
							)}
						</div>
					</>
				) : (
					<>
						<NavLink to={"/login"}>
							<motion.button
								{...buttonClick}
								className="px-4 py-2 rounded-md shadow-md bg-lightOverlay border border-red-300 cursor-pointer"
							>
								Login
							</motion.button>
						</NavLink>
					</>
				)}
			</nav>
		</header>
	);
};

export default Header;

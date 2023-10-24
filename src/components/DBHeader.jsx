import React, { useContext } from "react";
import { MdLogout } from "../assets/icons";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { Avatar } from "../assets";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import AuthContext from "../context/AuthContext";

const DBHeader = () => {
	const { deleteUser } = useContext(AuthContext);
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

	return (
		<div className="w-full flex items-center justify-between gap-3">
			<p style={{ color: "wheat", fontSize: "40px" }}>Welcome</p>

			<div className="flex items-center justify-center gap-4">
				<div className="flex items-center justify-center gap-2">
					<div className="w-10 h-10 rounded-md shadow-md cursor-pointer overflow-hidden">
						<motion.img
							className="w-full h-full object-cover"
							src={Avatar}
							whileHover={{ scale: 1.15 }}
							referrerPolicy="no-referrer"
						/>
					</div>
					<motion.div
						{...buttonClick}
						className="w-10 h-10 rounded-md cursor-pointer bg-lightOverlay backdrop-blur-md shadow-md flex items-center justify-center"
						onClick={signOut}
					>
						<MdLogout className="text-gray-400 text-xl" />
					</motion.div>
				</div>
			</div>
		</div>
	);
};

export default DBHeader;

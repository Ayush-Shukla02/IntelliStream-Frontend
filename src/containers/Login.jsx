import React, { useEffect, useState } from "react";
import { LoginBg, Logo } from "../assets";
import { LoginInput } from "../components";
import { FaEnvelope, FaLock } from "../assets/icons";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { validateUserJWTToken } from "../api";
import { setUserDetails } from "../context/actions/userActions";
import {
	alertInfo,
	alertNull,
	alertWarning,
} from "../context/actions/alertActions";
import { Auth } from "aws-amplify";

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isSignUp, setIsSignUp] = useState(false);
	const [isRegistered, setIsRegistered] = useState(false);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user);
	const temporary_user = null;
	const alert = useSelector((state) => state.alert);

	useEffect(() => {
		if (user) {
			// query on lambda

			// personalize_run(user);

			navigate("/", { replace: true });
		}
	}, [user]);

	const handleLogin = async () => {
		try {
			const curr_user = await Auth.signIn(email, password);
			dispatch(setUserDetails(curr_user));
			console.log("User logged in:", curr_user);
		} catch (err) {
			// dispatch(alertWarning(err.message));
			// setTimeout(() => {
			// 	dispatch(alertNull());
			// }, 3000);
			console.log(err.message);
		}
	};

	const handleRegister = async () => {
		if (password !== confirmPassword) {
			// dispatch(alertWarning("Passwords do not match"));
			// setTimeout(() => {
			// 	dispatch(alertNull());
			// }, 3000);
			return;
		}
		try {
			const data = await Auth.signUp({
				username: email,
				password,
				attributes: {
					email, // default
				},
			});
			console.log("User registered:", data);
			// temporary_user = data;
			setIsRegistered(true);
		} catch (err) {
			console.log(err.message);
		}
	};

	const handleVerification = async (verificationCode) => {
		try {
			await Auth.confirmSignUp(email, verificationCode);
			// user = temporary_user;
			// dispatch(setUserDetails(user));
			console.log("Email verified successfully");
			setIsSignUp(false);
			setIsRegistered(false);
			// dispatch(alertInfo("Email verified successfully"));
			// setTimeout(() => {
			// 	dispatch(alertNull());
			// }, 3000);
		} catch (err) {
			console.log("error in verification: ", err.message);
		}
	};

	return (
		<div className="w-screen h-screen relative overflow-hidden flex">
			{/* Background Image */}
			<img
				src={LoginBg}
				alt="Background"
				className="w-full h-full object-cover absolute top-0 left-0"
			/>
			{/* Content Box */}
			<div className="flex flex-col items-center bg-darkOverlay w-[30%] md:w-500 h-full z-10 backdrop-blur-xl p-4 px-4 py-12 gap-6">
				<div className="flex items-center justify-start gap-4 w-full">
					<img src={Logo} className="w-12 rounded-full" alt="Logo" />
					<p className="text-headingColor font-semibold text-2xl">
						IntelliStream
					</p>
				</div>
				{/* Welcome Text */}
				<p className="text-3xl font-semibold text-headingColor">
					Welcome
				</p>
				{/* Input Fields */}
				<div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
					{isRegistered ? (
						<EmailVerification
							email={email}
							onVerify={handleVerification}
						/>
					) : (
						<>
							<LoginInput
								placeholder={"Email Here"}
								icon={
									<FaEnvelope className="text-xl text-textColor" />
								}
								inputState={email}
								inputStateFunc={setEmail}
								type="email"
							/>
							<LoginInput
								placeholder={"Password Here"}
								icon={
									<FaLock className="text-xl text-textColor" />
								}
								inputState={password}
								inputStateFunc={setPassword}
								type="password"
							/>

							{isSignUp && (
								<LoginInput
									placeholder={"Confirm Password"}
									icon={
										<FaLock className="text-xl text-textColor" />
									}
									inputState={confirmPassword}
									inputStateFunc={setConfirmPassword}
									type="password"
								/>
							)}
						</>
					)}

					{!isRegistered &&
						(!isSignUp ? (
							<p>
								Don't have an account?{" "}
								<motion.button
									{...buttonClick}
									className="text-red-400 underline cursor-pointer bg-transparent"
									onClick={() => setIsSignUp(true)}
								>
									Create one
								</motion.button>{" "}
							</p>
						) : (
							<p>
								Already have an account?{" "}
								<motion.button
									{...buttonClick}
									className="text-red-400 underline cursor-pointer bg-transparent"
									onClick={() => {
										setIsSignUp(false);
										setIsRegistered(false);
									}}
								>
									Sign In
								</motion.button>{" "}
							</p>
						))}

					{/* Login Button Section */}
					{isSignUp ? (
						!isRegistered && (
							<motion.button
								{...buttonClick}
								className="w-[50%] px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-156"
								onClick={handleRegister}
							>
								Sign Up
							</motion.button>
						)
					) : (
						<motion.button
							{...buttonClick}
							className="w-[50%] px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-156"
							onClick={handleLogin}
						>
							Sign In
						</motion.button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Login;

function EmailVerification({ email, onVerify }) {
	const [verificationCode, setVerificationCode] = useState("");

	const handleVerification = () => {
		onVerify(verificationCode);
	};

	return (
		<div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
			<motion.div className="flex items-center justify-center gap-4 bg-lightOverlay backdrop-blur-md rounded-md w-full px-4 py-2">
				<FaLock className="text-xl text-textColor" />
				<input
					type="text"
					placeholder="Verification Code"
					value={verificationCode}
					onChange={(e) => setVerificationCode(e.target.value)}
					className="w-full h-full bg-transparent text-headingColor text-lg font-semibold border-none outline-none"
				/>
			</motion.div>

			<motion.button
				{...buttonClick}
				className="w-[50%] px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-156"
				onClick={handleVerification}
			>
				Verify Email{" "}
			</motion.button>
		</div>
	);
}

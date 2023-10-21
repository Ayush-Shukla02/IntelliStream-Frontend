import React, { useEffect, useState } from "react";
import { LoginBg, Logo } from "../assets";
import { LoginInput } from "../components";
import { FaEnvelope, FaLock, FcGoogle } from "../assets/icons";
import { motion } from "framer-motion";
import { buttonClick } from "../animations";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
	getAuth,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
} from "firebase/auth";
import { app } from "../config/firebase.config";
import { validateUserJWTToken } from "../api";
import { setUserDetails } from "../context/actions/userActions";
import {
	alertInfo,
	alertNull,
	alertWarning,
} from "../context/actions/alertActions";

const Login = () => {
	const [userEmail, setUserEmail] = useState("");
	const [isSignUp, setIsSignUp] = useState(false);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const firebaseauth = getAuth(app);
	const provider = new GoogleAuthProvider();

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const user = useSelector((state) => state.user);
	const alert = useSelector((state) => state.alert);

	useEffect(() => {
		if (user) {
			// query on lambda

			navigate("/", { replace: true });
		}
	}, [user]);

	const loginWithGoogle = async () => {
		// await signInWithPopup(firebaseauth, provider)
		// 	.then((userCred) => {
		// 		firebaseauth.onAuthStateChanged((cred) => {
		// 			if (cred) {
		// 				cred.getIdToken().then((token) => {
		// 					validateUserJWTToken(token).then((data) => {
		// 						dispatch(setUserDetails(data));
		// 					});
		// 					navigate("/", { replace: true });
		// 				});
		// 			}
		// 		});
		// 	})
		// 	.catch((error) => {
		// 		if (error.code === "auth/cancelled-popup-request") {
		// 			dispatch(
		// 				alertInfo("Popup request was cancelled by the user.")
		// 			);
		// 			setInterval(() => {
		// 				dispatch(alertNull());
		// 			}, 3000);
		// 		} else if (error.code === "auth/popup-closed-by-user") {
		// 			dispatch(alertInfo("Popup was closed by the user."));
		// 			setInterval(() => {
		// 				dispatch(alertNull());
		// 			}, 3000);
		// 		} else {
		// 			dispatch(
		// 				alertWarning("Authentication Error: ", error.message)
		// 			);
		// 			setInterval(() => {
		// 				dispatch(alertNull());
		// 			}, 3000);
		// 		}
		// 	});
	};

	const signUpWithEmailPass = async () => {
		// if (userEmail === "" || password === "" || confirmPassword === "") {
		// 	dispatch(alertInfo("Required fields should not be empty."));
		// 	setInterval(() => {
		// 		dispatch(alertNull());
		// 	}, 3000);
		// } else if (password !== confirmPassword) {
		// 	dispatch(alertWarning("Passwords do not match."));
		// 	setInterval(() => {
		// 		dispatch(alertNull());
		// 	}, 3000);
		// } else {
		// 	setUserEmail("");
		// 	setPassword("");
		// 	setConfirmPassword("");
		// 	await createUserWithEmailAndPassword(
		// 		firebaseauth,
		// 		userEmail,
		// 		password
		// 	).then((userCred) => {
		// 		firebaseauth.onAuthStateChanged((cred) => {
		// 			if (cred) {
		// 				cred.getIdToken().then((token) => {
		// 					validateUserJWTToken(token).then((data) => {
		// 						dispatch(setUserDetails(data));
		// 					});
		// 					navigate("/", { replace: true });
		// 				});
		// 			}
		// 		});
		// 	});
		// }
	};

	const signInWIthEmailPass = async () => {
		// if (userEmail === "" || password === "") {
		// 	dispatch(alertInfo("Required fields should not be empty."));
		// } else {
		// 	setUserEmail("");
		// 	setPassword("");
		// 	await signInWithEmailAndPassword(firebaseauth, userEmail, password)
		// 		.then((userCred) => {
		// 			firebaseauth.onAuthStateChanged((cred) => {
		// 				if (cred) {
		// 					cred.getIdToken().then((token) => {
		// 						validateUserJWTToken(token).then((data) => {
		// 							dispatch(setUserDetails(data));
		// 						});
		// 						navigate("/", { replace: true });
		// 					});
		// 				}
		// 			});
		// 		})
		// 		.catch((error) => {
		// 			const errorCode = error.code;
		// 			const errorMessage = error.message;
		// 			if (errorCode === "auth/wrong-password") {
		// 				dispatch(alertWarning("Wrong Password"));
		// 			} else if (errorCode === "auth/user-not-found") {
		// 				dispatch(alertWarning("User not found"));
		// 			}
		// 		});
		// }
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
			<div className="flex flex-col items-center bg-lightOverlay w-[30%] md:w-500 h-full z-10 backdrop-blur-md p-4 px-4 py-12 gap-6">
				<div className="flex items-center justify-start gap-4 w-full">
					<img src={Logo} className="w-8" alt="Logo" />
					<p className="text-headingColor font-semibold text-2xl">
						IntelliStream
					</p>
				</div>
				{/* Welcome Text */}
				<p className="text-3xl font-semibold text-headingColor">
					Welcome
				</p>
				<p className="text-xl text-textColor -mt-6">
					Continue using the following methods
				</p>
				{/* Input Fields */}
				<div className="w-full flex flex-col items-center justify-center gap-6 px-4 md:px-12 py-4">
					<LoginInput
						placeholder={"Email Here"}
						icon={<FaEnvelope className="text-xl text-textColor" />}
						inputState={userEmail}
						inputStateFunc={setUserEmail}
						type="email"
						isSignUp={isSignUp}
					/>
					<LoginInput
						placeholder={"Password Here"}
						icon={<FaLock className="text-xl text-textColor" />}
						inputState={password}
						inputStateFunc={setPassword}
						type="password"
						isSignUp={isSignUp}
					/>

					{isSignUp && (
						<LoginInput
							placeholder={"Confirm Password"}
							icon={<FaLock className="text-xl text-textColor" />}
							inputState={confirmPassword}
							inputStateFunc={setConfirmPassword}
							type="password"
							isSignUp={isSignUp}
						/>
					)}

					{!isSignUp ? (
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
								onClick={() => setIsSignUp(false)}
							>
								Sign In
							</motion.button>{" "}
						</p>
					)}

					{/* Login Button Section */}
					{isSignUp ? (
						<motion.button
							{...buttonClick}
							className="w-[50%] px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-156"
							onClick={signUpWithEmailPass}
						>
							Sign Up
						</motion.button>
					) : (
						<motion.button
							{...buttonClick}
							className="w-[50%] px-4 py-2 rounded-md bg-red-400 cursor-pointer text-white text-xl capitalize hover:bg-red-500 transition-all duration-156"
							onClick={signInWIthEmailPass}
						>
							Sign In
						</motion.button>
					)}
				</div>
				<div className="flex items-center justify-between gap-16">
					<div className="w-24 h-[1px] rounded-md bg-white"></div>
					<p className="text-white">or</p>
					<div className="w-24 h-[1px] rounded-md bg-white"></div>
				</div>
				<motion.div
					{...buttonClick}
					className="flex items-center justify-center px-20 py-2 bg-lightOverlay backdrop-blur-md cursor-pointer rounded-3xl gap-4"
					onClick={loginWithGoogle}
				>
					<FcGoogle className="text-3xl" />
					<p className="capitalize text-base text-headingColor">
						Sign In with Google
					</p>
				</motion.div>
			</div>
		</div>
	);
};

export default Login;

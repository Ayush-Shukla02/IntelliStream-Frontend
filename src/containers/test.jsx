import React, { useState } from "react";
import { Auth } from "aws-amplify";

function AuthPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [isLogin, setIsLogin] = useState(true);
	const [isRegistered, setIsRegistered] = useState(false);
	const [error, setError] = useState(null);

	const handleLogin = async () => {
		try {
			const user = await Auth.signIn(email, password);
			console.log("User logged in:", user);
		} catch (err) {
			setError(err.message);
		}
	};

	const handleRegistration = async () => {
		if (password !== confirmPassword) {
			setError("Passwords do not match");
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
			setIsRegistered(true);
		} catch (err) {
			setError(err.message);
		}
	};

	const handleVerification = async (verificationCode) => {
		try {
			await Auth.confirmSignUp(email, verificationCode);
			console.log("Email verified successfully");
		} catch (err) {
			setError(err.message);
		}
	};

	return (
		<div>
			{isRegistered ? (
				<EmailVerification
					email={email}
					onVerify={handleVerification}
				/>
			) : (
				<>
					<input
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						type="password"
						placeholder="Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
					{!isLogin && (
						<input
							type="password"
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					)}
					{isLogin ? (
						<button onClick={handleLogin}>Login</button>
					) : (
						<button onClick={handleRegistration}>Register</button>
					)}
					<button onClick={() => setIsLogin((prev) => !prev)}>
						{isLogin ? "Switch to Register" : "Switch to Login"}
					</button>
					{error && <div style={{ color: "red" }}>{error}</div>}
				</>
			)}
		</div>
	);
}

function EmailVerification({ email, onVerify }) {
	const [verificationCode, setVerificationCode] = useState("");
	const [error, setError] = useState(null);

	const handleVerification = () => {
		onVerify(verificationCode);
	};

	return (
		<div>
			<input
				type="text"
				placeholder="Verification Code"
				value={verificationCode}
				onChange={(e) => setVerificationCode(e.target.value)}
			/>
			<button onClick={handleVerification}>Verify Email</button>
			{error && <div style={{ color: "red" }}>{error}</div>}
		</div>
	);
}

export default AuthPage;

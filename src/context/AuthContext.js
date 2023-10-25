import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
	const [userId, setUserId] = useState(null);
	const [user, setUser] = useState(null);
	const [userMood, setUserMood] = useState(null);

	useEffect(() => {
		if (localStorage && localStorage.getItem("user")) {
			setUser(localStorage.getItem("user"));
		}
		if (localStorage && localStorage.getItem("userId")) {
			setUserId(localStorage.getItem("userId"));
		}

		if (localStorage && localStorage.getItem("userMood")) {
			setUserMood(localStorage.getItem("userMood"));
		}
	}, []);

	const storeUser = (user) => {
		localStorage.setItem("user", JSON.stringify(user));
		console.log("stored user");
	};

	const storeUserId = (userId) => {
		localStorage.setItem("userId", userId);
		console.log("stored userId");
	};

	const storeUserMood = (userMood) => {
		localStorage.setItem("userMood", userMood);
		console.log("stored userMood");
	};

	const deleteUser = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("userId");
		localStorage.removeItem("userMood");
		// setUser(null);
		// setUserId(null);
	};

	let contextData = {
		storeUser: storeUser,
		User: user,
		userId: userId,
		userMood: userMood,
		storeUserId: storeUserId,
		deleteUser: deleteUser,
		storeUserMood: storeUserMood,
	};

	return (
		<AuthContext.Provider value={contextData}>
			{children}
		</AuthContext.Provider>
	);
};

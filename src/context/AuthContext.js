import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();
export default AuthContext;

export const AuthProvider = ({ children }) => {
	const [userId, setUserId] = useState(null);
	const [user, setUser] = useState(null);

	useEffect(() => {
		if (localStorage && localStorage.getItem("user")) {
			setUser(localStorage.getItem("user"));
		}
		if (localStorage && localStorage.getItem("userId")) {
			setUserId(localStorage.getItem("userId"));
		}
	}, []);

	const storeUser = (user) => {
		localStorage.setItem("user", JSON.stringify(user));
		console.log("stored user");
	};

	const storeUserId = (userId) => {
		localStorage.setItem("userId", JSON.stringify(userId));
		console.log("stored userId");
	};

	const deleteUser = () => {
		localStorage.removeItem("user");
		localStorage.removeItem("userId");
	};

	let contextData = {
		storeUser: storeUser,
		User: user,
		userId: userId,
		storeUserId: storeUserId,
		deleteUser: deleteUser,
	};

	return (
		<AuthContext.Provider value={contextData}>
			{children}
		</AuthContext.Provider>
	);
};

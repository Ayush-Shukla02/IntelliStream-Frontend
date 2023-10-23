import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./containers/Login";
import Home from "./components/home/Home";
import Movie from "./components/movieDetail/movie";
import Dashboard from "./containers/Dashboard";
import { AuthProvider } from "./context/AuthContext";

const App = () => {
	return (
		<div className="App">
			<AuthProvider>
				<Routes>
					<Route path="/*" element={<Home />} />
					<Route path="/movie/:id" element={<Movie />} />
					<Route path="/login" element={<Login />} />
					<Route path="/dashboard/*" element={<Dashboard />} />
				</Routes>
			</AuthProvider>
		</div>
	);
};

export default App;

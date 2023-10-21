import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./containers/Login";
import Home from "./components/home/Home";
import Movie from "./components/movieDetail/movie";
import Dashboard from "./containers/Dashboard";

const App = () => {
	return (
		<div className="App">
			<Routes>
				<Route path="/*" element={<Home />} />
				<Route path="/movie/:id" element={<Movie />} />
				<Route path="/login" element={<Login />} />
				<Route path="/dashboard/*" element={<Dashboard />} />
			</Routes>
		</div>
	);
};

export default App;

import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Amplify } from "aws-amplify";
import config from "./aws-exports";
Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<Router>
			<AnimatePresence>
				<App />
			</AnimatePresence>
		</Router>
	</React.StrictMode>
);

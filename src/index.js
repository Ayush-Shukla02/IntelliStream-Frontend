import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { createStore } from "redux";
import { Provider } from "react-redux";
import myReducers from "./context/reducers";

import {Amplify} from "aws-amplify";
import config from "./aws-exports";
Amplify.configure(config);

const myStore = createStore(
	myReducers,
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<React.StrictMode>
		<Router>
			<AnimatePresence>
				<Provider store={myStore}>
					<App />
				</Provider>
			</AnimatePresence>
		</Router>
	</React.StrictMode>
);

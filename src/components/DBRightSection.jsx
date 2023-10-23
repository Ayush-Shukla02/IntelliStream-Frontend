import React from "react";
import { Route, Routes } from "react-router-dom";
import { DBHome, DBHistory } from "./dashboard";
import DBHeader from "./DBHeader";

const DBRightSection = () => {
	return (
		<div className="flex flex-col px-12 py-12 flex-1 h-full">
			<DBHeader />
			<div className="flex flex-col flex-1 overflow-y-scroll scrollbar-none">
				<h1>This is right section of dashboard</h1>
				<Routes>
					<Route path="/" element={<DBHome />} />
					<Route path="/home" element={<DBHome />} />
					<Route
						path="/history"
						element={<DBHistory movies={[]} />}
					/>
					{/* <Route path="/items" element={<DBItems />} />
					<Route path="/newItem" element={<DBNewItem />} />
					<Route path="/users" element={<DBUsers />} /> */}
				</Routes>
			</div>
		</div>
	);
};

export default DBRightSection;

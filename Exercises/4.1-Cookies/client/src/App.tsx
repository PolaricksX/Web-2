import React from "react";
import "./App.css";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import DisplayAll from "./components/DisplayAll";
import FindOne from "./components/FindOne";
import Footer from "./components/Footer";

function App() {
	return (
		<>
			<Router
				future={{
					v7_startTransition: true,
					v7_relativeSplatPath: true,
				}}
			>
				<div>
					<NavBar />

					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/list-one" element={<FindOne />} />
						<Route path="/list-all" element={<DisplayAll />} />
					</Routes>
				</div>
				<Footer />
			</Router>
		</>
	);
}

export default App;

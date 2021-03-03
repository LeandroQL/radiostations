import React from "react";
import logo from "./logo.svg";
import "./home.css";

import Card from '../../components/Card'

const Home: React.FC = () => {
	return (
		<div className="container">
			<Card title={"Stations"}/>
		</div>
	);
}

export default Home;

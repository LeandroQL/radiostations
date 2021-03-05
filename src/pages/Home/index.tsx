import React, {useState, useEffect} from "react";
import logo from "./logo.svg";
import "./home.css";

import Card, {Station} from '../../components/Card'

const Home: React.FC = () => {
	
	return (
		<div className="container">
			<Card title={"Stations"}/>
		</div>
	);
}

export default Home;

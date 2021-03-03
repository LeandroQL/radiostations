import React, { useState, useEffect, CSSProperties } from "react";
import "./card.css";

import { stationList } from "./constants";
import back_arrow from "../../images/back-arrow.png";
import switch_button from "../../images/switch.png";
import minus from "../../images/minus.png";
import plus from "../../images/plus.png";

import axios from "axios";

export interface Station {
	name: string;
	frequency: string;
	image_url: string;
}

interface CardProps {
	title: string;
}

const Card = ({ title }: CardProps) => {
	const [stations, setStations] = useState<Station[]>();
	const [selected, setSelected] = useState<Station>();

	const fetch = async () => {
		const { data } = await axios.get("http://localhost:3333/station");
		setStations(data);
	};
	useEffect(() => {
		fetch();
	}, []);

	const getSubMenu = (station: Station) => {
		
		return (
			<div
				className={
					selected?.frequency === station.frequency
						? "card__list-selected active"
						: "card__list-selected"
				}
			>
				<img alt={"Turn down"} src={minus} />
				<img
					alt={station.name}
					className={"card__list-selected-image"}
					src={station.image_url}
				/>
				<img alt={"Turn up"} src={plus} />
			</div>
		);
	};

	const onClick = (station: Station) => {
		if (!selected) setSelected(station)
		if (selected?.frequency === station.frequency) setSelected(undefined)
		else setSelected(station)
	}

	return (
		<section className="card">
			<div className="card__header">
				<img src={back_arrow} alt={"Return button"} />
				<h1>{title}</h1>
				<img src={switch_button} alt={"Return button"} />
			</div>
			<ul className="card__list">
				{stations?.map((station) => (
					<li
						id={station.frequency}
						className={"card__list-item"}
						onClick={() => onClick(station)}
					>
						{getSubMenu(station)}
						<div className="card__list-item-textWrapper">
							<p>{station.name}</p>
							<span>{station.frequency}</span>
						</div>
					</li>
				))}
			</ul>
			<div className="card__footer">
				<p>{selected ? "Currently Playing" : ""}</p>
				<span>{selected?.name}</span>
			</div>
		</section>
	);
};

export default Card;

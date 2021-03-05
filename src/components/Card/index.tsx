import React, { useState, useEffect, CSSProperties } from "react";
import "./card.css";

import { stationList } from "./constants";
import back_arrow from "../../images/back-arrow.png";
import switch_button from "../../images/switch.png";
import minus from "../../images/minus.png";
import plus from "../../images/plus.png";

import api from "../../api";

export interface Station {
	name: string;
	frequency: string;
	image_url: string;
}

interface CardProps {
	title: string;
}

const Card = ({ title }: CardProps) => {
	const [selected, setSelected] = useState<Station>();
	const [stations, setStations] = useState<Station[]>();

	const fetch = async () => {
		const res = await api.stationList();
		setStations(res);
	};
	useEffect(() => {
		fetch();
	}, []);
	const getSubMenu = (station: Station) => {
		return (
			<div
				data-testid={station.name + "is-selected"}
				className={
					selected?.frequency === station.frequency
						? "card__list-selected active"
						: "card__list-selected"
				}
			>
				<button className={"card__icons-button"}>
					<img className={"card__icons"} alt={"Turn down volume"} src={minus} />
				</button>
				<div className={"card__list-selected-image"}>
					<img
						data-testid={"selected-station-image" + station.name}
						alt={station.name}
						src={station.image_url}
					/>
				</div>
				<button className={"card__icons-button"}>
					<img className={"card__icons"} alt={"Turn up volume"} src={plus} />
				</button>
			</div>
		);
	};

	const onClick = (station: Station) => {
		if (!selected) setSelected(station);
		if (selected?.frequency === station.frequency) setSelected(undefined);
		else setSelected(station);
	};

	return (
		<section className="card">
			<div className="card__header">
				<button className={"card__icons-button"}>
					<img
						className={"card__icons"}
						src={back_arrow}
						alt={"Return button"}
					/>
				</button>
				<h1>{title}</h1>
				<button className={"card__icons-button"}>
					<img
						className={"card__icons"}
						src={switch_button}
						alt={"Power Off button"}
					/>
				</button>
			</div>
			<ul className="card__list" id="station-list" data-testid="station-list">
				{stations?.map((station, idx) => (
					<li
						key={idx}
						id={station.frequency}
						className={"card__list-item"}
						onClick={() => onClick(station)}
						data-testid={idx}
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
				<span data-testid="currently-playing">{selected?.name}</span>
			</div>
		</section>
	);
};

export default Card;

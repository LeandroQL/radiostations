import React, { useState, useEffect, useRef } from "react";
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
	music: string;
}

interface CardProps {
	title: string;
}

const Card = ({ title }: CardProps) => {
	const [selected, setSelected] = useState<Station>();
	const [stations, setStations] = useState<Station[]>();
	const [srcMusic, setSrcMusic] = useState<string>("");
	const musicRef = useRef<HTMLAudioElement>(null);

	const fetch = async () => {
		//Request from api
		// const res = await api.stationList();
		const res = stationList
		setStations(res);
	};
	useEffect(() => {
		fetch();
	}, []);

	useEffect(() => {
		if (selected) {
			setSrcMusic(selected.music);
		} else {
			setSrcMusic("");
		}
	}, [selected]);

	useEffect(() => {
		if (selected?.music) {
			if (musicRef && musicRef.current) {
				if (srcMusic && srcMusic.length > 0) {
					musicRef.current.src = srcMusic;
					musicRef.current.play();
				}
			}
		} else {
			musicRef && musicRef.current && musicRef.current.pause();
		}
	}, [srcMusic]);

	const getList = () => {
		if (stations && stations.length < 1) {
			return (
				<div className={"class__list-warning"}>
					<h1>No radio stations found</h1>
				</div>
			);
		} else {
			return stations?.map((station, idx) => (
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
			));
		}
	};

	const getSubMenu = (station: Station) => {
		return (
			<div
				id={
					selected?.frequency === station.frequency
						? station.name + "is-selected"
						: station.name
				}
				data-testid={
					selected?.frequency === station.frequency
						? station.name + "is-selected"
						: station.name
				}
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
					{station.music && (
						<audio data-testid={station.music} ref={musicRef} src={srcMusic} />
					)}
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

	const Loader = () => {
		//Pure css loader loading.io
		return <div data-testid="loader" className="lds-ring"><div></div><div></div><div></div><div></div></div>
	}

	return stations ? (
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
			<ul
				className="card__list"
				id="station-list"
				data-testid="station-list"
			>
				{getList()}
			</ul>
			<div className="card__footer">
				<p>{selected ? "Currently Playing" : ""}</p>
				<span data-testid="currently-playing">{selected?.name}</span>
			</div>
		</section>
	)
	:
	<Loader />
	;
};

export default Card;

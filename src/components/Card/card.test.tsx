import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Card from "./index";
import api from "../../api";

const mockedApi = (api.stationList = jest.fn());

jest.mock("../../api");

const stationList = [
	{
		name: "Putin FM",
		frequency: "66,6",
		image_url: "/images/station3.jpg",
	},
	{
		name: "Dribbble FM",
		frequency: "101,2",
		image_url: "/images/station3.jpg",
	},
	{
		name: "Doge FM",
		frequency: "99,4",
		image_url: "/images/station3.jpg",
	},
	{
		name: "Ballads FM",
		frequency: "87,1",
		image_url: "/images/station3.jpg",
	},
	{
		name: "Maximum FM",
		frequency: "142,2",
		image_url: "/images/station3.jpg",
	},
];

describe("Card Component", () => {
	it("Show list of stations from api", async () => {
		mockedApi.mockResolvedValue(stationList);
		render(<Card title={"Stations"} />);
		const containerList = await screen.findByTestId("station-list");
		expect(containerList.children.length).toBe(5);
	});

	it("Toggle and show the details of a station", async () => {
		mockedApi.mockResolvedValue(stationList);
		render(<Card title={"Stations"} />);

		expect(await screen.findByText(stationList[0].name)).toBeInTheDocument();
		const button = screen.getByTestId("0");
		fireEvent.click(button);

		//Check if the selected station menu is active
		const selectedStation = screen.getByTestId(
			stationList[0].name + "is-selected"
		);
		expect(selectedStation.className).toBe("card__list-selected active");

		//Check if Currently Playing is showing the right station
		const currentlyPlaying = screen.getByTestId("currently-playing");
		expect(currentlyPlaying.innerHTML).toBe(stationList[0].name);
	});
});

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import { WeatherDay } from './WeatherDay';

export const WeatherWidget = () => {
	const [weatherData, setWeatherData] = useState([]);

	useEffect(() => {
		const getWeatherData = async () => {
			try {
				const response = await fetch(
					'http://localhost:5000/weather/get'
				);
				const data = await response.json();
				setWeatherData(data);
			} catch (error) {
				console.log(error);
			}
		};
		getWeatherData();
	}, []);

	return (
		<Wrapper>
			{weatherData.map((day) => {
				return (
					<DayWrapper key={day.date}>
						<WeatherDay day={day} />
					</DayWrapper>
				);
			})}
		</Wrapper>
	);
};

const Wrapper = styled.div`
	display: flex;
	background: white;
	margin: 10px;
	padding: 10px;
	border-radius: 10px;
	box-shadow: 2px 2px 10px gray;
`;

const DayWrapper = styled.div`
	padding: 8px;
	border-right: 2px solid gray;
	:last-of-type {
		border-right: none;
	}
`;

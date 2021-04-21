import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

export const WeatherDay = ({ day }) => {
	const options = { month: 'long', day: 'numeric' };
	const currentDay = new Date(day.date).toLocaleDateString(
		'sv-SE',
		options
	);

	return (
		<>
			<DataRow>
				<h2>{currentDay}</h2>
			</DataRow>
			<DataRow>
				<h3>Max temp.</h3>
				<p>{day.max}°</p>
			</DataRow>
			<DataRow>
				<h3>Min temp.</h3>
				<p>{day.min}°</p>
			</DataRow>
			<DataRow>
				<h3>Medel temp.</h3>
				<p>{day.average}°</p>
			</DataRow>
			<DataRow>
				<h3>Median temp.</h3>
				<p>{day.median}°</p>
			</DataRow>
		</>
	);
};

WeatherDay.propTypes = {
	day: PropTypes.object,
};

const DataRow = styled.div`
	h2 {
		font-size: 16px;
	}
	h3 {
		font-size: 14px;
	}
	p {
		font-size: 14px;
	}
	text-align: center;
	border-bottom: 1px solid lightgray;
	padding: 8px;
	:first-of-type {
		border-bottom: 2px solid lightgray;
	}
	:last-of-type {
		border-bottom: none;
	}
`;

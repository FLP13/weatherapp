import React from 'react';
import styled from 'styled-components';

import { WeatherWidget } from './components/WeatherWidget';

export const App = () => {
	return (
		<ContentWrapper>
			<WeatherWidget />
		</ContentWrapper>
	);
};

const ContentWrapper = styled.div`
	display: flex;
	justify-content: center;
`;

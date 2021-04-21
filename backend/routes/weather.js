const router = require('express').Router();
const fetch = require('node-fetch');

router.route('/get').get(async (_, response) => {
	const API_KEY = process.env.API_KEY;

	const GOTHENBURG_LAT = '57.7072';
	const GOTHENBURG_LONG = '11.9668';

	const ONE_DAYS_AGO = Math.floor(Date.now() / 1000) - 24 * 60 * 60;
	const TWO_DAYS_AGO = Math.floor(Date.now() / 1000) - 24 * 60 * 60 * 2;
	const THREE_DAYS_AGO = Math.floor(Date.now() / 1000) - 24 * 60 * 60 * 3;
	const FOUR_DAYS_AGO = Math.floor(Date.now() / 1000) - 24 * 60 * 60 * 4;

	try {
		const rawData = await Promise.all([
			fetch(
				`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${GOTHENBURG_LAT}&lon=${GOTHENBURG_LONG}&dt=${FOUR_DAYS_AGO}&units=metric&appid=${API_KEY}`
			),
			fetch(
				`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${GOTHENBURG_LAT}&lon=${GOTHENBURG_LONG}&dt=${THREE_DAYS_AGO}&units=metric&appid=${API_KEY}`
			),
			fetch(
				`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${GOTHENBURG_LAT}&lon=${GOTHENBURG_LONG}&dt=${TWO_DAYS_AGO}&units=metric&appid=${API_KEY}`
			),
			fetch(
				`https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=${GOTHENBURG_LAT}&lon=${GOTHENBURG_LONG}&dt=${ONE_DAYS_AGO}&units=metric&appid=${API_KEY}`
			),
		]);

		const data = await Promise.all(rawData.map((rd) => rd.json()));

		const weatherData = [];

		data.forEach((day) => {
			dayilyData = {
				date: new Date(day.current.dt * 1000),
				max: getMaxTemp(day.hourly),
				min: getMinTemp(day.hourly),
				median: getMedianTemp(day.hourly),
				average: getAverageTemp(day.hourly),
			};
			weatherData.push(dayilyData);
		});

		return response.status(200).json(weatherData);
	} catch (error) {
		return response.status(400).json('Error: ' + error);
	}
});

const getMinTemp = (arr) => {
	const minTemp = [...arr].reduce(
		(min, p) => (p.temp < min ? p.temp : min),
		arr[0].temp
	);
	return Math.round(minTemp);
};

const getMaxTemp = (arr) => {
	const maxTemp = [...arr].reduce(
		(max, p) => (p.temp > max ? p.temp : max),
		arr[0].temp
	);
	return Math.round(maxTemp);
};

const getAverageTemp = (arr) => {
	let total = 0;
	arr.forEach((val) => {
		total += val.temp;
	});
	const average = total / arr.length;
	return Math.round(average);
};

const getMedianTemp = (arr) => {
	const sortedArr = [...arr].sort((a, b) => a.temp - b.temp);
	console.log(sortedArr);

	const mid = Math.ceil(sortedArr.length / 2);
	const medianTemp = (sortedArr[mid].temp + sortedArr[mid - 1].temp) / 2;

	return Math.round(medianTemp);
};

module.exports = router;

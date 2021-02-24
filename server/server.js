require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();

const Port = process.env.PORT || 3000;

app.listen(Port, (res, req) => {
	console.log(`Server is up on Port ${Port}`);
});

app.get('/', async (req, res) => {
	try {
		const url = 'https://api.github.com/search/repositories?q=stars:>10000';
		const response = await axios.get(url);
		const results = await response.data;

		const nums = results.items.forEach((a) => a.full_name);

		res.status(200).json({
			status: 'success',
			data: {
				result: nums,
			},
		});
	} catch (err) {
		console.log(err);
	}
});

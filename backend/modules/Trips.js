const {query} = require('./utils');

const getTripsInYears = async (req, res, next) => {
	const results = await query('trips_year');
	res.json({
    	success: true,
    	data: results
    });
};

const getTripsInMonths = async (req, res, next) => {
	const results = await query('trips_month');
	res.json({
    	success: true,
    	data: results
    });
};

const getTripsPaymentVol = async (req, res, next) => {
	const results = await query('trips_payment_vol');
	res.json({
    	success: true,
    	data: results
    });
};

const getTripsCashTipsCoords = async (req, res, next) => {
	const results = await query('trips_with_cashtips_cords');
	res.json({
    	success: true,
    	data: results
    });
};


module.exports = {
	getTripsInYears,
	getTripsInMonths,
	getTripsPaymentVol,
	getTripsCashTipsCoords
};
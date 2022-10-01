const express = require('express');
const router = express.Router();
const { getTripsInYears, getTripsInMonths, getTripsPaymentVol, getTripsCashTipsCoords } = require('./modules/Trips');

router.get('/', (req, res) => {
	res.json({success: true, message: 'Welcome to API page!'});
});

router.get('/trips/year', getTripsInYears);
router.get('/trips/months', getTripsInMonths);
router.get('/trips/payment', getTripsPaymentVol);
router.get('/trips/coords', getTripsCashTipsCoords);

module.exports = router;
const express = require('express');
const router = express.Router(); // instantiates a router object to handle middleware for specific path
const axios = require('axios');

router.get('/:countryCode', async(req, res) => {
    try {
        let countryCode = req.params.countryCode.replace('-99', 'SO');
        let url1 = `https://restcountries.com/v3.1/alpha/${countryCode}`

        const response1 = await axios.get(url1);

        let capital = response1.data[0].capital[0];

        let lat = response1.data[0].capitalInfo.latlng[0];
        let lng = response1.data[0].capitalInfo.latlng[1];

        let url2 = `http://api.geonames.org/timezoneJSON?lat=${lat}&lng=${lng}&username=kwasimodo`;

        const response2 = await axios.get(url2);

        let obj = {};

        obj.sunrise = response2.data.sunrise;
        obj.sunset = response2.data.sunset;
        obj.time = response2.data.time;
        obj.gmtOffset = response2.data.gmtOffset;
        obj.city = capital;

        res.status(200).json(obj);

    } catch (e) {
        console.error('Error getting timezone data', e);
        res.status(500).json({error:'Error getting timezone data' })

    }
});

module.exports = router;
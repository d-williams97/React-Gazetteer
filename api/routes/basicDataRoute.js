const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:countryCode',async (req, res) => {
    try {
        const {countryCode} = req.params;
        let realCountryCode = countryCode.replace('-99', 'SO')

        let url = `http://api.geonames.org/countryInfoJSON?country=${realCountryCode}&username=kwasimodo`;

        let response = await axios.get(url);

        res.status(200).json(response.data)


    } catch (e) {
        console.error('Error getting basic data', e);
        res.status(500).json({error: 'Basic data API error'});

    }
})

module.exports = router;
const express = require('express');
const router = express.Router(); // instantiates a router object to handle middleware for specific path
const axios = require('axios');

router.get('/:countryCode', async(req, res) => {
    try {
        const {countryCode} = req.params 
        let code = countryCode.replace('-99', 'SO');
        let url = `https://restcountries.com/v3.1/alpha/${code}`;

        let response = await axios.get(url);
        let data = response.data[0].currencies;
        res.status(200).json(data);

    } catch (e) {
        console.error('Currency API error');
        res.status(500).json({error: 'Currency API error'});

    }
})

module.exports = router;
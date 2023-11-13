const express = require('express');
const router = express.Router(); // instantiates a router object to handle middleware for specific path
const axios = require('axios');

router.get('/', async(req, res) => {
    try {
        let url = 'https://openexchangerates.org/api/latest.json?app_id=e9b26c51d8aa46a796b410c227bae478'
        
        let response = await axios.get(url);
        res.status(200).json(response.data);

    } catch (e) {
        console.error('Currency API error', e);
        res.status(500).json({error: 'Currency API error'});

    }
})

module.exports = router;
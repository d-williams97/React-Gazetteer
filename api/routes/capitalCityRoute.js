const express = require('express');
const router = express.Router();
const axios = require('axios');

router.get('/:countryCode', async (req, res) => {
    try {
        const { countryCode } = req.params;
        let code = countryCode.replace('-99', 'SO');
        let url = `https://restcountries.com/v3.1/alpha/${code}`;

        let response = await axios.get(url);

        res.status(200).json(response.data[0].capital[0]);

    } catch (e) {
        console.error('Capital city API error', e);
        res.status(500).json({error: 'Capital city API error'})
    }

})

module.exports = router
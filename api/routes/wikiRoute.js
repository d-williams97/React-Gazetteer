const express = require('express');
const router = express.Router(); // instantiates a router object to handle middleware for specific path
const axios = require('axios');

router.get('/:countryName', async (req, res) => {

    try {
        const {countryName} = req.params;
        let country = countryName.replace(/ /g,'%20');
        let url = `http://api.geonames.org/wikipediaSearchJSON?q=${country}&maxRows=200&username=kwasimodo`;

        const response = await axios.get(url);

        let data = response.data.geonames.find(e => e.title === countryName);
        if (!data) {
            data = response.data.geonames[0];
        }

        res.status(200).json(data);

    } catch (e) {
        console.error('Wiki API error');
        res.status(500).json({error: 'Wiki API error'})
    }

})

module.exports = router;
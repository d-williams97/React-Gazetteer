const express = require('express')
const router = express.Router()
const axios = require('axios');

router.post('/', async (req, res)  => {
    try {

        const {countryCode} = req.body
        let code = countryCode.replace('-99', 'SO');
        let url = `http://api.geonames.org/searchJSON?country=${code}&cities=cities1000&username=kwasimodo`;

        const response = await axios.get(url);
        let cities = [];

        response.data.geonames.forEach((e) => {
            let obj = {};
            obj.lng = e.lng;
            obj.lat = e.lat;
            obj.name = e.name;
            obj.population = e.population;
            obj.key = Math.random();

            cities.push(obj)
        })

        res.status(200).json(cities)


    } catch (e) {
        console.error('Error getting city data', e);
        res.status(500).json({error: 'Error API city data' })
    }

})

module.exports = router
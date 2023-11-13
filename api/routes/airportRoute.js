const express = require('express'); // using the express framework is a routing and middleware framework.
const router = express.Router(); // creates an instance of a express router which helps us define a modular route
const axios = require('axios')

router.post('/', async (req, res) => {
    try {
        let countryCodeData = req.body.countryCode;
        let countryCode = countryCodeData.replace('-99', 'SO');
        let url = `http://api.geonames.org/searchJSON?q=airport&country=${countryCode}&username=kwasimodo`

        const response = await axios.get(url)
        .catch((e) => {
            console.error('Error getting API data: ',e)
            res.status(500).json({error: 'Error getting API data', err})
        })

        let airportData = [];

        response.data.geonames.forEach((e) => {
            let obj = {};
            obj.lng = e.lng;
            obj.lat = e.lat;
            obj.name = e.name;
            obj.key = Math.random();

            airportData.push(obj)
        } )

        res.status(200).json(airportData);


    } catch (e) {
        console.error('Error getting airport API data: ',e);
        res.status(500).json({error: 'Error getting API data', err});
    }

})


module.exports = router // attaching the router middleware to the exports object within the global module object 
// so that it can be used in other parts of the application
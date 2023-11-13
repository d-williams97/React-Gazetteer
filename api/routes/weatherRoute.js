const express = require('express');
const router = express.Router(); // instantiates a router object to handle middleware for specific path
const axios = require('axios');

router.get('/:capital', async (req, res) => {
    try {
        const {capital} = req.params;
        let capitalCity = capital.replace( / /g, '%20').replace(/'/g, '').replace('Naypyidaw','Yangon');
        let url = `http://api.weatherapi.com/v1/forecast.json?key=470223832314483eafa150451230708&q=${capitalCity}&days=3&aqi=no&alerts=no`;

        let response = await axios.get(url);
        
        res.status(200).json(response.data);


    } catch (e) {
        console.error('Weathr API error', e);
        res.status(500).json({error : 'Weather API error'})
    }
})

module.exports = router;
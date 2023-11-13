const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const data = require('../assets/countryBorders.geo.json').features;
        
        data.forEach(country => country.key = Math.random())
        data.sort((a, b) => {
            return a.properties.name.localeCompare(b.properties.name); // sorting in alphabetical order with localeCompare.
          });
        res.status(200).json(data);
    } catch(e) {
        console.error('Error getting country data', e)
        res.status(500).json({error: 'internal server error', err})
    }
  
})

module.exports = router;
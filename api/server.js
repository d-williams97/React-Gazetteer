const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());





// ---- Getting GeoJSON data ---- //
app.get('/country-data', async (req, res) => {
    try {
        const data = require('./assets/countryBorders.geo.json').features;
        
        data.forEach(country => country.key = Math.random())
        data.sort((a, b) => {
            return a.properties.name.localeCompare(b.properties.name);
          });
    
        res.status(200).json(data);
    } catch(e) {
        console.error('Error getting country data', e)
        res.status(500).json({error: 'internal server error', err})
    }
  
})


// ---- Getting Border data ---- //
app.get('/bounds-data/:countryName', async (req, res) => {
    try {
        let countryData = req.params.countryName;
        let countryName = countryData.replace(/ /g, '%20'); //regex that replaces all spaces 
        
        // fetch data
        let url = `https://api.opencagedata.com/geocode/v1/json?q=${countryName}&key=e3489716a6574283b20a91a3349be943&pretty=1`;
        const response = await axios.get(url).catch((e) => {
            console.error('Error getting API data', e)
        })

        res.status(200).json(response.data.results[0])

    } catch (e) {
        console.error('Error getting border', e)
        res.status(500).json({error: 'internal server error', err})

    }
})

app.listen(3001, () => {
    console.log('app is running')
})
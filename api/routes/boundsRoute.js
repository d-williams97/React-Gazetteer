const express = require('express');
const axios = require ('axios')
const router = express.Router(); //creating a new router object to handle requests.

router.get('/:countryName', async (req, res) => {
    try {
        const {countryName} = req.params;
        let country = countryName.replace(/ /g, '%20'); //regex that replaces all spaces;


        // fetch data
        let url = `https://api.opencagedata.com/geocode/v1/json?q=${country}&key=e3489716a6574283b20a91a3349be943&pretty=1`;
        const response = await axios.get(url)
        .catch((e) => {
            console.error('Error getting API data', e)
            res.status(500).json({error: 'internal server error', err})
        })

        res.status(200).json(response.data.results[0])

    } catch (e) {
        console.error('Error getting border', e)
        res.status(500).json({error: 'internal server error', err})

    }

})


module.exports = router 

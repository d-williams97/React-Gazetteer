const express = require('express');
const router  = express.Router(); // creates a new router object to handle requests 
const axios  = require('axios'); 

router.get('/:countryName', async (req, res) => {
    
    try{
        console.log(req.params)
        const { countryName } = req.params;
        let country  = countryName.replace(/ /g, '%20');
        let url = `https://restcountries.com/v3.1/name/${country}`

        let response = await axios.get(url);

        let data;
        response.data.forEach(e => {
            let obj = {};
            obj.flag = e.flag;
            obj.flags = e.flags;

            data = obj
        })
        res.status(200).json(data);

    } catch (e) {
        console.error('Error getting flag', e);
        res.status(200).json({error: "Flag API error"});
    }
})

module.exports = router;
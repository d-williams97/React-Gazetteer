const express = require('express');
const cors = require('cors');
const axios = require('axios');

const countryRoute = require('./routes/countryRoute');
const airportRoute = require('./routes/airportRoute');
const cityRoute = require('./routes/cityRoute');
const boundsRoute = require('./routes/boundsRoute');
const basicDataRoute = require('./routes/basicDataRoute');
const flagRoute = require('./routes/flagRoute');
const weatherRoute = require('./routes/weatherRoute');
const capitalCityRoute = require('./routes/capitalCityRoute');
const wikiRoute = require('./routes/wikiRoute');
const currencyRoute = require('./routes/currencyRoute');
const exchangeRateRoute = require('./routes/exchangeRateRoute');
const timeZoneRoute = require('./routes/timeZoneRoute');


const app = express(); 
app.use(express.json()); // / without specifying the request URL these functions are run everytine a request is made 
app.use(cors());

app.listen(3001, () => {
    console.log('working')
})


// // --- Getting all country data --- //
// app.use('/country-data', countryRoute);

// // ---- Getting Border data ---- //
// app.use('/bounds-data', boundsRoute);

// // --- Getting Airport data --- //
// app.use('/airport-data', airportRoute);

// // --- Getting City data --- //
// app.use('/city-data', cityRoute );

// // -- BASIC DATA MODAL --//
// app.use('/basic-data', basicDataRoute);

// // Get Flag Data //
// app.use('/flag-data', flagRoute);


// // -- WEATHER MODAL -- //

// // Get Capital City data //
// app.use('/capital-city',capitalCityRoute);

// // Get Weather data //
// app.use('/weather', weatherRoute);


// // -- Wiki MODAL -- //
// app.use('/wiki-data',wikiRoute);


// // -- ER MODAL -- //
// // Get currency data //
// app.use('/currency',currencyRoute);

// // Get exchange rate data //
// app.use('/er', exchangeRateRoute);


// // Get TimeZone data //
// app.use('/timezone',timeZoneRoute);



app.listen(3001, () => {
    console.log('app is running')
})
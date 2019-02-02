


/*
node app-promise.js -a 19146
node app-promise.js --address 'Denver, CO, 80202'
node app-promise.js -a 'Denver, CO, 80202'
https://api.darksky.net/forecast/df420f47af315d8fffb13dd6ae7fbef1/39.939066,-75.181151
*/
const yargs = require('yargs');

const axios = require('axios');

const argv = yargs.options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Adress to fetch weather for',
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURIComponent(argv.address);

var geocodeUrl = `http://www.mapquestapi.com/geocoding/v1/address?key=8DkdQNbznLpAzgfTGFZgDOE3rpyGKAXd&location=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.results[0].locations[0].geocodeQualityCode === 'A1XAX') {
        throw new Error('Unable to find that address');
    }
    var latitude = response.data.results[0].locations[0].latLng.lat;
    var longitude = response.data.results[0].locations[0].latLng.lng;
    var weatherUrl = `https://api.darksky.net/forecast/df420f47af315d8fffb13dd6ae7fbef1/${latitude},${longitude}`;
    console.log(response.data.results[0].providedLocation.location);
    return axios.get(weatherUrl);
}).then((response) => {
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It is currently temperature ${temperature}.It feels like ${apparentTemperature}`);
}).catch((errorMessage) => {
    if (errorMessage.code == 'ENOTFOUND') {
        console.log('unable to connect to API servers');
    } else {
        console.log(errorMessage.message);
    }
});
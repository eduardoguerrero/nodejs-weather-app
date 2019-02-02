


//Create a function geocodeAddress and use a callback.

const request = require('request');


var geocodeAddress = (address, callback) => {

    var encodedAddress = encodeURIComponent(address, callback);

    request({
        url: `http://www.mapquestapi.com/geocoding/v1/address?key=8DkdQNbznLpAzgfTGFZgDOE3rpyGKAXd&location=${encodedAddress}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to mapquest api.');
        } else if (body.results[0].locations[0].geocodeQualityCode === 'A1XAX') {
            callback('Unable to find that address.');
        } else if (body.results[0].locations[0].geocodeQualityCode !== 'A1XAX') {
            callback(undefined, {
                address: body.results[0].providedLocation.location,
                latitude: body.results[0].locations[0].latLng.lat,
                longitude: body.results[0].locations[0].latLng.lng
            });           
        }
    });
};

module.exports.geocodeAddress = geocodeAddress;
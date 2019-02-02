
//Promise example
//node promise-2.js

const request = require('request');

var geocodeAddress = (address)=>{
	return new Promise((resolve, reject)=>{
	var encodedAddress = encodeURIComponent(address);
    request({
    	url: `http://www.mapquestapi.com/geocoding/v1/address?key=8DkdQNbznLpAzgfTGFZgDOE3rpyGKAXd&location=${encodedAddress}`,
    	json: true
    }, (error, response, body)=>{
        if(error){
        	reject('Unable to connect to mapquest api.');
            //callback('Unable to connect to mapquest api.');        	
        }else if(body.results[0].locations[0].geocodeQualityCode ==='A1XAX'){ 
            //callback('Unable to find that address.');
            reject('Unable to find that address.');        	
        }else if(body.results[0].locations[0].geocodeQualityCode !=='A1XAX'){
        	 resolve({
                address:   body.results[0].providedLocation.location,
                latitude:  body.results[0].locations[0].latLng.lat,
                longitude: body.results[0].locations[0].latLng.lng
            });
            /*callback(undefined, {
                address:   body.results[0].providedLocation.location,
                latitude:  body.results[0].locations[0].latLng.lat,
                longitude: body.results[0].locations[0].latLng.lng
            });   */   
        }
      });
	});
};


geocodeAddress('19146').then((location)=>{
	console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage)=>{
	console.log(errorMessage);
});





const request = require('request');

var getWeather = (latitude, longitude, callback)=>{
	 request({
    	url: `https://api.darksky.net/forecast/df420f47af315d8fffb13dd6ae7fbef1/${latitude},${longitude}`,
    	json: true
    }, (error, response, body)=>{
        if(error){
        	callback('Unable to connect to Forecast.io server.');        	
        }else if(response.statusCode === 400){
        	callback('Unable to fetch weather.');        	
        }else if(response.statusCode ===200){
        	callback(undefined, { 
        		'temperature': body.currently.temperature,
        		'apparentTemperature': body.currently.apparentTemperature
        	});        
        }
    });
};


module.exports.getWeather = getWeather;
 
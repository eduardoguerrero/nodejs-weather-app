

//Promise examples
//node promise.js



var asyncAdd = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number') {
                resolve(a + b);
            } else {
                reject('Argument must be numbers');
            }
        }, 1500);
    });

};


//Example
asyncAdd(5, 11).then((res) => {
    console.log('Result', res);
}, (errorMessage) => {
    console.log(errorMessage);
});


//Example two promises
asyncAdd(5, 7).then((res) => {
    console.log('Result', res);
    return asyncAdd(res, 33);
}, (errorMessage) => {
    console.log(errorMessage);
}).then((res) => {
    console.log('should be 45', res);
}, (errorMessage) => {
    console.log(errorMessage);
});


//Example catch promises
asyncAdd(5, '7').then((res) => {
    console.log('Result', res);
    return asyncAdd(res, 33);
}).then((res) => {
    console.log('should be 45', res);
}).catch((errorMessage) => {
    console.log(errorMessage);
});


//Hello world with promises
/*var someAPromise = new Promise((resolve, reject)=>{
	setTimeout(()=>{
		resolve('Hello, it worked!');		
		//reject('Unable to fulfill Promise');		
	}, 2500);
});


someAPromise.then((message)=>{
	console.log('Success', message);
}, (errorMessage)=>{
	console.log('Error:', errorMessage);
});
*/
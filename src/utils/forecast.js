const request = require("request");

const forecast  = (cords, callback) => {

    var urlForecast = '';

    if (typeof(cords) === 'string') {
         urlForecast = 'http://api.openweathermap.org/data/2.5/weather?q='+encodeURIComponent(cords)+'&units=metric&APPID=efed882d4f7eb70d76b2b2ecefbf11e6';
    }
    else if (Array.isArray(cords)){
        urlForecast =  'http://api.openweathermap.org/data/2.5/weather?lat=' + cords[1] + '&lon=' + cords[0] +'&units=metric&appid=efed882d4f7eb70d76b2b2ecefbf11e6';
    }
    else{
        console.log('Coordinates are not valid. City/geo-coordinates Array')
    }

    request({url: urlForecast, json:true}, (error, {body}) => {
        
        if (error !== null) {
            callback(error, undefined);
        }
        else if (Object.keys(body).length <3) {
            callback(body.message, undefined);
        }
        else{

            const data = body;
            callback(null, data);
        }
        
    })
}

module.exports = forecast;
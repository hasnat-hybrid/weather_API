const request = require("request");

const geocode = (city, callback) => {

    const urlCords = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(city) +'.json?access_token=pk.eyJ1IjoiaGFzbmF0LWh5YnJpZCIsImEiOiJja3Ryc3JxZHAxOWhwMm9xdWk3N3AzeXQ0In0.Fk7NnpeR2mQs7w0Sj2kfJg'

    request({url: urlCords, json:true}, (error, {body}) => {
        
        if (error !== null) {
            
            callback(error, undefined);
        }
        else if (!body.type) {
            callback(body.message, undefined);
        }
        else{
            if (body.features.length === 0) {
                callback('Address is not Valid.', undefined);
            }
            else{

                const data = body.features[0].center;
                callback(null, data);
                }
        }
    })
}

module.exports =  geocode;
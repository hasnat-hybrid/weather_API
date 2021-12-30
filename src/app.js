// Dependencies
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');

// Express Configurations and paths
const app = express();
const port = process.env.PORT || 3000;

const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// setup handlebars and views
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

//static path
app.use(express.static(publicDirPath));

// Application Routes
app.get('', (req, res) => {

    res.render('index', {
        title: 'Home',
        Head: 'Weather App',
        name: 'Hasnat'
    })
});

app.get('/help', (req, res) => {

    res.render('help', {
        title: 'Help',
        msg: 'How can we help you?',
        name: 'Hasnat'
    })
});

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        
        return res.send({
            error: 'No address is given.'
        })
    }
    
            geocode(req.query.address, (error, data) => {
    
                if (error){
                  return res.send({
                    error: error
                })
                }

                  forecast(data, (forecastError, data) => {
                    if (forecastError){
                        return res.send({
                            error: error
                        })
                    }
                    return res.send({
                        forecast: data.weather[0].description,
                        location: data.name+', ' + data.sys.country,
                        address: req.query.address,
                        temp: data.main.temp
                    })
                  })
              })  
});

app.get('/help/*', (req, res) => {
    
    res.render('not404', {
        
    })
});

app.get('*', (req, res) => {
    
    res.render('not404', {
    
    })
});

//Listener with msg
app.listen(port, () => {
    console.log('Server is up on: ' + port);
});
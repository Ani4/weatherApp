const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      request= require('request'),
      apiKey ='f3c2d413af279831521211a17aaa7f53';

app.set("view engine","ejs");
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));
// app.use(express.json({limit:'1mb'}));


app.get('/',function(req,res){
    let weatherText=null;
    let error;
    res.render('index',{weather:weatherText , error:null});
});



app.post('/', function (req, res) {
    let city = req.body.city;
    console.log(city);
    /* let lon = req.body.lon;
    let lat = req.body.lat; */
    /* console.log(req.body); */
   /*  res.json({
        status:'OK its work',
        lat:lat,
        lon:lon
    }); */
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    console.log(url);
        request(url, function (err, resspons, body) {
            
            if (err) {
                res.render('index', { weather: null, error: 'Error, please try again' });
            } else {
                let weather = JSON.parse(body);
                console.log(weather);
                
                if (weather.main == undefined) {
                    res.render('index', { weather: null, error: 'Error, please try again' });
                } else {
                    res.render('index', { weather: weather, error: null });
                }
            }
    })
})


app.set('port', process.env.PORT || 3000);
app.set('ip', process.env.IP || "0.0.0.0");
app.listen(app.get('port'), app.get('ip'), function () {
    console.log('Weather App is started https://weather-ani.herokuapp.com/  ||'+'localhost:3000');
});

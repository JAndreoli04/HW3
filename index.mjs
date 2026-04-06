//auth key
//cd74ee42f250141de19229ef2ac1a8754355c1f4fefbe0cc

import express from 'express';
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));
import { DateTime } from 'luxon';


app.get('/', (req, res) => {
   res.render('home.ejs')
});

app.get('/search', (req, res) => {
   res.render('search.ejs')
});

app.get('/searchLocation', async (req, res) => {
    let location = req.query.Location;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&limit=1&units=imperial&appid=836a84a6abc77828051d5add0a2f27ef`
    let response = await fetch(url);
    let data = await response.json();
    const readableTime = DateTime.fromSeconds(data.dt)
                           .toLocaleString(DateTime.DATETIME_MED);

    res.render('results.ejs', {location, data, readableTime})
});

app.get('/current', async(req, res) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=Monterey&limit=1&units=imperial&appid=836a84a6abc77828051d5add0a2f27ef`
    let response = await fetch(url);
    let data = await response.json();
    const readableTime = DateTime.fromSeconds(data.dt)
                           .toLocaleString(DateTime.DATETIME_MED);

    
   res.render('current.ejs', {data, readableTime});
});


app.listen(3000, () => {
   console.log('server started');
});

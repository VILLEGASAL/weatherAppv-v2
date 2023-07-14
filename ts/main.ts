import express, { Express, Application, Request, Response } from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import axios from "axios"
import { WeatherData } from "./weatherDataClass.js";

const app:Application = express();
const PORT:number = 5000;

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static("public"));

let long:string;
let lat:string;

let weather:WeatherData = new WeatherData("", "", 0, "");

app.get("/", (req:Request, res:Response) => {

    
    res.render("getLocation.ejs",{
        location: weather.placeName.toUpperCase(),
        description: weather.weatherDescription.toUpperCase(),
        temp: weather.temperature,
        img: weather.icon
    })
    
});

app.post("/", async(req:Request, res:Response) => {

    try {

        long = String(req.body.lon);
        lat = String(req.body.lat);
        
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=163a06221608b6d43aef4bc8eb6cd6cd`;

        let getData = await axios({
            method: "GET",
            url: url,
        })

        let data = await getData.data;

        let weatherData:WeatherData = new WeatherData(data.name, data.weather[0].description, data.main.temp, data.weather[0].icon);
        
        weather = weatherData
        
        res.redirect("/");

    } catch (error) {
        
        console.log(`Al there's an error : ${error}`);
        
    }
});

app.post("/getWeatherByCityName", async(req:Request, res:Response) => {

    try {
        
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&units=metric&appid=163a06221608b6d43aef4bc8eb6cd6cd`;
        
        let getData = await axios({
            method: "GET",
            url: url
        });

        let data = await getData.data;

        let weatherData:WeatherData = new WeatherData(data.name, data.weather[0].description, data.main.temp, data.weather[0].icon);

        weather = weatherData

        res.redirect("/");

    } catch (error) {
        
        console.log(`Al there's an error: ${error}`);
        
    }
});

app.listen(PORT, () => {

    console.log(`Server is running on port ${PORT}...`);
    
});
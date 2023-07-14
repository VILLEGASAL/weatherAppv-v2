import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { WeatherData } from "./weatherDataClass.js";
const app = express();
const PORT = 5000;
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
let long;
let lat;
let weather = new WeatherData("", "", 0, "");
app.get("/", (req, res) => {
    res.render("getLocation.ejs", {
        location: weather.placeName.toUpperCase(),
        description: weather.weatherDescription.toUpperCase(),
        temp: weather.temperature,
        img: weather.icon
    });
});
app.post("/", async (req, res) => {
    try {
        long = String(req.body.lon);
        lat = String(req.body.lat);
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=163a06221608b6d43aef4bc8eb6cd6cd`;
        let getData = await axios({
            method: "GET",
            url: url,
        });
        let data = await getData.data;
        let weatherData = new WeatherData(data.name, data.weather[0].description, data.main.temp, data.weather[0].icon);
        weather = weatherData;
        res.redirect("/");
    }
    catch (error) {
        console.log(`Al there's an error : ${error}`);
    }
});
app.post("/getWeatherByCityName", async (req, res) => {
    try {
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&units=metric&appid=163a06221608b6d43aef4bc8eb6cd6cd`;
        let getData = await axios({
            method: "GET",
            url: url
        });
        let data = await getData.data;
        let weatherData = new WeatherData(data.name, data.weather[0].description, data.main.temp, data.weather[0].icon);
        weather = weatherData;
        res.redirect("/");
    }
    catch (error) {
        console.log(`Al there's an error: ${error}`);
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}...`);
});

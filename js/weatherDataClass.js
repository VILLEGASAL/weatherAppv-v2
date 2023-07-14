export class WeatherData {
    placeName;
    weatherDescription;
    temperature;
    icon;
    constructor(cityName, weatherDescription, temp, icon) {
        this.placeName = cityName;
        this.weatherDescription = weatherDescription;
        this.temperature = temp;
        this.icon = icon;
    }
}

export class WeatherData{

    placeName:string;
    weatherDescription:string;
    temperature:number;
    icon:string;

    constructor(cityName:string, weatherDescription:string, temp:number, icon:string){

        this.placeName = cityName;
        this.weatherDescription = weatherDescription;
        this.temperature = temp;
        this.icon = icon;

    }
}
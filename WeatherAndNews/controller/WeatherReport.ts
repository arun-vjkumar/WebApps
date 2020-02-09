import * as CityDetailsJson from "../config/CityDetails.json";

interface CityDetail {
    "id": number,
    "name": string,
    "country": string,
    "coord": {
        "lon": number,
        "lat": number
    }
}

export class WeatherReport {
    private static cityDetails: {[name: string]: CityDetail} = {};

    constructor() {
        for (let cityDetail of CityDetailsJson['default']) {
            WeatherReport.cityDetails[cityDetail['name'].toUpperCase()] = cityDetail;
        }
    }

    private static getCityId(cityName: string): number {
        cityName = cityName.toUpperCase();
        if (cityName in WeatherReport.cityDetails) {
            return WeatherReport.cityDetails[cityName]['id'];
        }
        return null;
    }
}

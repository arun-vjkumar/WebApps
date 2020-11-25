import * as CityDetailsJson from "../config/CityDetails.json";
import { WeatherApiRequest } from "../service/WeatherApiRequests";

interface CityDetail {
    "id": number,
    "name": string,
    "country": string,
    "coord": {
        "lon": number,
        "lat": number
    }
}

class WeatherReportController {
    private static cityDetails: {[name: string]: CityDetail} = {};

    constructor() {
        for (let cityDetail of CityDetailsJson['default']) {
            WeatherReportController.cityDetails[cityDetail['name'].toUpperCase()] = cityDetail;
        }
    }

    private static getCityId(cityName: string): number {
        cityName = cityName.toUpperCase();
        if (cityName in WeatherReportController.cityDetails) {
            return WeatherReportController.cityDetails[cityName]['id'];
        }
        return null;
    }

    getAllCityDetails(): {[name: string]: CityDetail} {
        return WeatherReportController.cityDetails;
    }

    getWeatherByCityId(cityId: number): Promise<any> {
        return WeatherApiRequest.getWeatherByCityId(cityId);
    }
}

export default WeatherReportController;

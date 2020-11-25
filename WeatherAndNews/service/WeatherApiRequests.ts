import axios from "axios";
import { OPEN_WEATHER_API_KEY, WEATHER_API_URL } from "../config/config";

export class WeatherApiRequest {

    private static async getRequest(suburl: string, params: any): Promise<any> {
        params = {...params, "appid": OPEN_WEATHER_API_KEY}
        return await (await axios.get(`${WEATHER_API_URL}/${suburl}`, {"params": params})).data
    }

    static async getWeatherByCityId(cityId: number): Promise<any> {
        return await this.getRequest("weather", {id: cityId})
    }
}

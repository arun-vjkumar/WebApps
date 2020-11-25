import {Application} from "express";
import WeatherReportController from "../controller/WeatherReport";
import { WeatherApiRequest } from "../service/WeatherApiRequests";

export class WeatherReportRoutes {
    private weatherReportController = new WeatherReportController();
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    routes() {
        this.app.get('/getAllCityDetails', (req, res) => {
            res.send(this.weatherReportController.getAllCityDetails());
         });

         this.app.get('/weather/:cityId', async (req, res) => {
             const { cityId } = req.params
             var weatherDetails = await this.weatherReportController.getWeatherByCityId(parseInt(cityId));
             res.send(weatherDetails);
             res.end();
         })
    }
}
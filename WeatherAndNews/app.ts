import express from 'express';
import { WeatherReportRoutes } from './routes/weatherReportRoutes';

class App {
    public app : express.Application;
    public weatherReportRoutes: WeatherReportRoutes;

    constructor() {
        this.app = express();
        this.weatherReportRoutes = new WeatherReportRoutes(this.app);
        this.initializeRoutes();
    }

    initializeRoutes() {
        this.weatherReportRoutes.routes();
    }
}

export default new App().app; 

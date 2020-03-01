import * as express from "express";
import * as bodyParser from "body-parser";
import { ContactRoutes } from "./routes/contactRoutes";
import * as mongoose from "mongoose";

class App {
    public app : express.Application;
    public contactRoutes: ContactRoutes = new ContactRoutes(); 
    public mongoUrl: string = 'mongodb://localhost/contactDB';

    constructor() {
        this.app = express();
        this.config();
        this.contactRoutes.routes(this.app);
        this.mongoSetup();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private mongoSetup(): void {
        mongoose.connect(this.mongoUrl);
    }
}

export default new App().app;
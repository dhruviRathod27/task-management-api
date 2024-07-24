import express,{ Express,Application, Request, Response, NextFunction } from "express";
import  bodyParser from "body-parser";
import 'dotenv/config'
import mongoose from "mongoose";
import { Routes } from "./routes";

class App {
    public app: Application;
    public allRoutes: Routes = new Routes();

    constructor () {
        this.app = express();
        this.config();
        this.setupMongoDB()
        this.allRoutes.routes(this.app);
    }

    private config(): void {
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            res.header('Access-Control-Allow-Headers', '*');
            next();
        })
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    private async setupMongoDB(): Promise<void> {
        try{
            // console.log('environment variable -> mongo url', process.env.MONGO_URL);
            await mongoose.connect(process.env.MONGO_URL as string)
            console.log('connected to mongoDB -> taskManagement');
            
        } catch (error) {
            console.log('+-------------------------------------------------------------+');
            console.log("# Error while connecting to MongoDB");
            console.log(error);
            
        }

    }
}

export default new App().app;
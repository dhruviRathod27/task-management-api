// import app from "app";

import { Application, Request, Response } from 'express';
import { TaskRoutes } from '../modules/task/taskRoute';
import { AuthRoutes } from '../modules/auth/authRoute';

export class Routes {
  public taskRoutes : TaskRoutes = new TaskRoutes();
  public authRoutes : AuthRoutes= new AuthRoutes();
  // * Home route
  public routes(app: any): void {
    app.route('/').get((req: Request, res: Response) => {
      res.status(200).send({
        message: 'Welcome to the API',
      });
    });

    this.taskRoutes.taskRoutes(app);
    this.authRoutes.authRoutes(app);

  }
}

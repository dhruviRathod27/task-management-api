// import app from "app";

import { Application, Request, Response } from 'express';
import { TaskRoutes } from '../modules/task/taskRoute';

export class Routes {
  public taskRoutes : TaskRoutes = new TaskRoutes();
  // * Home route
  public routes(app: any): void {
    app.route('/').get((req: Request, res: Response) => {
      res.status(200).send({
        message: 'Welcome to the API',
      });
    });

    this.taskRoutes.taskRoutes(app);

  }
}

import { TaskController } from "./taskController";

const taskController: TaskController = new TaskController()

export class TaskRoutes {
    public taskRoutes(app:any) :void {
        // * Task Save
        app.route('/api/task')
            .post(taskController.addTask)
            
        app.route('/api/task/table')
            .get(taskController.getTaskTable)

        app.route('/api/task/:taskId')
            .get(taskController.getTaskById)
            .put(taskController.updateTask)
            .delete(taskController.deleteTask)
        
    }
}
import { Request, Response } from 'express';
import _ from 'lodash'
import { TaskService } from './taskService';
import { ApiResponse } from '../../response';

const taskService: TaskService = new TaskService();
const response: ApiResponse = new ApiResponse();
export class TaskController {
    
    // * Add Task
    public addTask = async (req: Request, res: Response) => {
        try {
            console.log('# TaskController -> addTask start');
            const taskData = await taskService.addTask(req.body);
            console.log('taskData===>', taskData);
            if(_.isError(taskData) || _.isEmpty(taskData) ) {
                return response.error(req, res, taskData, "TASK_CREATE_ERROR");
            }
            console.log('# TaskController -> addTask end');
            return response.send(req, res, taskData, 'TASK_CREATED');
            
        } catch (err) {
            console.log('# TaskController -> addTask -> err: ', err);
            return response.serverError(req, res, err, 'INTERNAL_SERVER');
        }
    }

    // * Get Task By id
    public getTaskById = async (req: Request, res: Response) => {
        try {
            console.log('# TaskController -> getTaskById : start');
            const taskDetails = await taskService.getTaskById({
                _id: req.params.taskId,
                isDeleted: false
            });

            if(_.isEmpty(taskDetails)){
                return response.error(req, res, taskDetails, "TASK_NOT_FOUND");
            }
            else if(_.isError(taskDetails) ){
                return response.error(req, res, taskDetails, "TASK_FETCH_ERROR");
            }

            return response.send(req, res, taskDetails, 'TASK_FETCHED');

        } catch (error) {
            console.log('# TaskController -> getTaskById -> catch : ', error);
            return response.serverError(req, res, error, 'INTERNAL_SERVER');
        }
    }

    // * Update Task
    public updateTask = async (req: Request, res: Response) => {
        try {
            // req.body.updatedBy = req.userId;
            console.log('# TaskController -> updateTask : start');
            const updatedData:any = await taskService.updateTask(
                {
                    _id: req.params.taskId,
                    isDeleted:false
                },
                req.body
            )
            if(_.isError(updatedData) || _.isEmpty(updatedData)){
                return response.error(req, res, updatedData, "TASK_UPDATE_ERROR");
            }
            else if (updatedData.modifiedCount <= 0){
                return response.error(
                    req, 
                    res, 
                    {taskId: req.params.taskId,"req.body":req.body}, 
                    "TASK_NOT_UPDATED"
                );
            }

            return response.send(req, res, updatedData, "TASK_UPDATED");
        } catch (error) {
            console.error('# TaskController -> updateTask -> catch : ', error);
            return response.serverError(req, res, error, 'INTERNAL_SERVER');
        }
    }

    // * Delete Task
    public deleteTask= async (req: Request, res: Response) => {
        try {
            console.log('# TaskController -> deleteTask : start');
            const deletedData:any = await taskService.deleteTask(
                {
                    _id: req.params.taskId,
                }
            )
            if(_.isError(deletedData) || _.isEmpty(deletedData)){
                return response.error(req, res, deletedData, "TASK_DELETE_ERROR");
            }
            else if (deletedData.modifiedCount <= 0){
                return response.error(req, res, {taskId: req.params.taskId}, "TASK_NOT_DELETED");
            }

            return response.send(req, res, deletedData, "TASK_DELETED");
        } catch (error) {
            console.error('# TaskController -> deleteTask -> catch : ', error);
            return response.serverError(req, res, error, 'INTERNAL_SERVER');
        }
    }

    // * Get Task Table
    public getTaskTable = async (req: Request, res: Response) => {
        try {

            console.log('req.query===>', req.query);

            console.log('# TaskController -> getTaskTable : start');

            const taskTable = await taskService.getTaskTable(req);
            
            if(_.isError(taskTable) || _.isEmpty(taskTable)){
                return response.error(req, res, taskTable, "TASK_TABLE_ERROR");
            }
            console.log('# TaskController taskTable===>', taskTable);
            return response.send(req, res, taskTable, "TASK_TABLE_FETCHED");
        } catch (error) {
            console.error('# TaskController -> getTaskTable -> catch : ', error);
            return response.serverError(req, res, error, 'INTERNAL_SERVER');
        }
    }
}
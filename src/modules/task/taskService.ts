import { Query } from '../../utils/query';
import _ from 'lodash';
import mongoose from 'mongoose';
import { TaskSchema } from './taskModule';

const taskModel = mongoose.model('Task', TaskSchema);
const query: Query = new Query();

export class TaskService extends Query {

  // * Add Task
  public addTask = async (reqData: any) => {
    try {
      console.log('# TaskService - > addTask start');

      const taskData = await query.save(taskModel, reqData);
      console.log('# TaskService - > addTask -> query.save result: ',taskData);

      return taskData;
    } catch (error) {
      console.log('# taskService -> addTask -> catch: ', error);
      return error;
    }
  };

  // * Get Task with id
  public getTaskById = async (reqData: any) => {
    try {
      console.log('# TaskService - > getTaskById : start');
      const TaskDetails = await query.find(taskModel,reqData,'',{})
      console.log('# TaskService - > getTaskById -> query.find result: ',TaskDetails);

      return TaskDetails;
      
    } catch (error) {
      console.log('# TaskService - > getTaskById -> catch : ', error);
      return error;
    }
  }

  // * Update Task
  public updateTask = async (reqData: any, updateData: any) => {
    try {
      console.log('# TaskService - > updateTask : start');

      const updatedData = await query.updateOne(taskModel, reqData, updateData);
      console.log('# TaskService - > updateTask -> query.updateOne result: ',updatedData);

      return updatedData;
    } catch (error) {
      console.log('# TaskService - > updateTask -> catch : ', error);
      return error;
    }
  }

  // * Delete Task
  public deleteTask = async (reqData: any) => {
    try {
      console.log('# TaskService - > deleteTask : start');

      const deletedData = await query.updateOne(taskModel, reqData, {isDeleted: true});
      console.log('# TaskService - > deleteTask -> query.updateOne result: ',deletedData);

      return deletedData;
    } catch (error) {
      console.log('# TaskService - > deleteTask -> catch : ', error);
      return error;
    }
  }

  public getTaskTable = async (reqData: any) => {
    try {
      console.log('# TaskService - > getTaskTable : start');

    //   const limit = _.toNumber(reqData.query.perPage) || 10;
    //   const skip = _.toNumber(reqData.query.page) * _.toNumber(reqData.query.perPage)

      const filter = {
        isDeleted: false,
      }

    //   let options: any = {
    //     lean: true,
    //     limit: limit,
    //     skip: skip,
    //   }
      const totalCount = await query.count(taskModel,filter);
      let taskTable:any = await query.findWithPaginationAndPopulation(taskModel,filter,'',{},{},'',{});

      let extraData = {
        perPage: _.toNumber(reqData.query.perPage),
        page: _.toNumber(reqData.query.page),
        total: totalCount
      }

      console.log('# TaskService - > getTaskTable -> query.findWithPaginationAndPopulation result: ',{data:taskTable,extraData});
      
      return {data:taskTable,extraData};

    } catch (error) {
      console.log('# TaskService - > getTaskTable -> catch : ', error);
    }
  }
}

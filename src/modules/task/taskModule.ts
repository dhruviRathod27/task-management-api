import { uniqueId } from 'lodash';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
// import deepPopulate from "mongoose-deep-populate";
const Schema = mongoose.Schema;
// * Mongoose defult timestamps
const timestamps = {
  timestamps: true,
};

const taskSchema = new Schema({
  title:
    {
      type: String,
      required: true,
    },
  description:
    {
      type: String,
      required: true,
    },
  priority:
    {
      type: String,
      required: true,
      enum:['low','medium','high']
    },
  status:
    {
      type: String,
      required: true,
      enum:['pending','in-progress','completed']
    },
  dueDate: {
    type: String,
  },
  userId:{
    type:String
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
},timestamps);

taskSchema.plugin(mongoosePaginate);
export const TaskSchema = taskSchema;


import {Schema , Document} from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
// import deepPopulate from "mongoose-deep-populate";
// * Mongoose defult timestamps
const timestamps = {
  timestamps: true,
};
interface IUser extends Document{
    username: string;
    //email: string;
    password: string;
  }
const userSchema = new Schema<IUser>({
    username: { type: String, required: true, unique: true },
    //email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
},timestamps);

userSchema.plugin(mongoosePaginate);
export const UserSchema = userSchema;
export { IUser };


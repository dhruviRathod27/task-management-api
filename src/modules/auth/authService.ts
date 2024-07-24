import { Query } from '../../utils/query';
import _ from 'lodash';
import mongoose from 'mongoose';
import { UserSchema, IUser } from './authModule';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userModel = mongoose.model('User', UserSchema);
const query: Query = new Query();

export class AuthService extends Query {

    // * Create User
    public login = async (reqData: any) => {
        try {
            console.log('# AuthService - > addTask start');
            const { email, password } = reqData;
            const user = await userModel.findOne({ email }) as IUser;
            if (!user) {
                return '';
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return '';
            }
            const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
            console.log('# AuthService - > login -> token: ', token);
            return token;
        } catch (error) {
            console.log('# AuthService -> login -> catch: ', error);
            return error;
        }
    };
    public register = async (reqData: any) => {
        try {
            console.log('# AuthService - > addTask start');
            const { username, email, password } = reqData;
            const existingUser = await userModel.findOne({ email });
            if (existingUser) {
                return 'existingUser';
            }
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new userModel({ username, email, password: hashedPassword });
            const userData = await query.save(userModel, newUser);
            console.log('# AuthService - > addTask -> query.save result: ', userData);

            return userData;
        } catch (error) {
            console.log('# AuthService -> addTask -> catch: ', error);
            return error;
        }
    };


}

import { Request, Response } from 'express';
import _ from 'lodash'
import { ApiResponse } from '../../response';
import { AuthService } from './authService';

const taskService: AuthService = new AuthService();
const response: ApiResponse = new ApiResponse();
export class AuthController {
    
    // * Create User
    public login = async (req: Request, res: Response) => {
        try {
            console.log('# TaskController -> addTask start');
            const userData = await taskService.login(req.body);
            console.log('userData===>', userData);
            if(userData == '') {
                return response.error(req, res, userData, "USER_LOGIN_ERROR");
            }
            console.log('# TaskController -> addTask end');
            return response.send(req, res, userData, 'USER_LOGIN_SUCCESS');
            
        } catch (err) {
            console.log('# TaskController -> addTask -> err: ', err);
            return response.serverError(req, res, err, 'INTERNAL_SERVER');
        }
    }
    // * Create User
    public register = async (req: Request, res: Response) => {
        try {
            console.log('# TaskController -> addTask start');
            const userData = await taskService.register(req.body);
            console.log('userData===>', userData);
            if(userData=='existingUser') {
                return response.error(req, res, userData, "USER_EXISTS_ERROR");
            }
            if(_.isError(userData) || _.isEmpty(userData) ) {
                return response.error(req, res, userData, "USER_REGISTER_ERROR");
            }
            console.log('# TaskController -> addTask end');
            return response.send(req, res, userData, 'USER_REGISTER_SUCCESS');
            
        } catch (err) {
            console.log('# TaskController -> addTask -> err: ', err);
            return response.serverError(req, res, err, 'INTERNAL_SERVER');
        }
    }

}
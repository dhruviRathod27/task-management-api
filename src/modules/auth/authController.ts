import { Request, Response } from 'express';
import _ from 'lodash'
import { ApiResponse } from '../../response';
import { AuthService } from './authService';

const authService: AuthService = new AuthService();
const response: ApiResponse = new ApiResponse();
export class AuthController {
    
    // * Login User
    public login = async (req: Request, res: Response) => {
        try {
            console.log('# AuthController -> login start');
            const userData = await authService.login(req.body);
            console.log('userData===>', userData);
            if(userData == '') {
                return response.error(req, res, userData, "USER_LOGIN_ERROR");
            }
            console.log('# AuthController -> login end');
            return response.send(req, res, userData, 'USER_LOGIN_SUCCESS');
            
        } catch (err) {
            console.log('# AuthController -> login -> err: ', err);
            return response.serverError(req, res, err, 'INTERNAL_SERVER');
        }
    }
    // * Register User
    public register = async (req: Request, res: Response) => {
        try {
            console.log('# AuthController -> register start');
            const userData = await authService.register(req.body);
            console.log('userData===>', userData);
            if(userData=='existingUser') {
                return response.error(req, res, userData, "USER_EXISTS_ERROR");
            }
            if(_.isError(userData) || _.isEmpty(userData) ) {
                return response.error(req, res, userData, "USER_REGISTER_ERROR");
            }
            console.log('# AuthController -> register end');
            return response.send(req, res, userData, 'USER_REGISTER_SUCCESS');
            
        } catch (err) {
            console.log('# AuthController -> register -> err: ', err);
            return response.serverError(req, res, err, 'INTERNAL_SERVER');
        }
    }

}
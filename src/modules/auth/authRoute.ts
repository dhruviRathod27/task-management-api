import { AuthController } from "./authController"

const authController: AuthController = new AuthController()

export class AuthRoutes {
    public authRoutes(app:any) :void {
        app.route('/api/login')
            .post(authController.login)

        app.route('/api/register')
            .post(authController.register)    
    }
}
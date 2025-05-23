import HttpException from "../exception/httpException";
import { AuthService } from "../services/auth.services";
import { Router , NextFunction , Response, Request} from "express";
export class AuthController {
    constructor (
        private authService : AuthService,
        private router: Router
    ){
        router.post("/login",this.login.bind(this))
    }

    async login(req:Request , res:Response , next: NextFunction){
        try{
            const {email,password} = req.body;
            if(!email|| !password){
                throw new HttpException(400,"email and password required")
            }
            const token = await this.authService.login(email,password)
            res.status(200).send(token)       
        } catch (err){
            next(err)
        }
    }
}
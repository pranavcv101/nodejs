import { NextFunction , Request ,Response  } from "express";
import { EmployeeRole } from "../entities/employee.entity";
import HttpException from "../exception/httpException";

export const checkRole = (crole:EmployeeRole) => {
    return (req:Request , res:Response , next:NextFunction) => {
        const role = req.user?.role
        if(role !== crole){
            throw new HttpException(403,"User has no previlage to access the resouve")
        }
        next()
        }
}


// export const authorizationMiddleware = (req:Request , res: Response , next:NextFunction) => {
//     const role = req.user?.role
//     if(role!== EmployeeRole.HR){
//         throw new HttpException(403,"User has no previlage to access the resouve")
//     }
//     next()
// }
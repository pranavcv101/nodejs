"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRoles = void 0;
const httpException_1 = __importDefault(require("../exception/httpException"));
// export const checkRole = (crole:EmployeeRole) => {
//     return (req:Request , res:Response , next:NextFunction) => {
//         const role = req.user?.role;
//         if(role !== crole){
//             throw new HttpException(403,"User has no previlage to access the resouve")
//         }
//         next()
//         }
// }
const checkRoles = (...roles) => {
    return (req, res, next) => {
        const role = req.user.role;
        if (!roles.includes(role)) {
            throw new httpException_1.default(403, "User has no  privilage to access the resource");
        }
        next();
    };
};
exports.checkRoles = checkRoles;
// export const authorizationMiddleware = (req:Request , res: Response , next:NextFunction) => {
//     const role = req.user?.role
//     if(role!== EmployeeRole.HR){
//         throw new HttpException(403,"User has no previlage to access the resouve")
//     }
//     next()
// }
//# sourceMappingURL=authorization.middleware.js.map
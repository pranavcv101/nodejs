import { Request , Response, NextFunction } from "express"
import HttpException from "../exception/httpException";
import { JWT_SECRET} from "../utils/constants";
import jwt from "jsonwebtoken"
import { JwtPayload } from "../dto/jwt-payloads";

const getToken = (req:Request ) => {
    const token = req.headers.authorization;
    if  (!token)
        throw new HttpException(401,'Not 1 authorized')
    const tokenSplits = token.split(' ')
    if (tokenSplits.length != 2)
        throw new HttpException(401,"invalid token")
    return tokenSplits[1]

}

export const authMiddleware = (req:Request , res:Response , next:NextFunction) => {
    const token = getToken(req);
    if(!token)
        throw new HttpException(401,"Not 2 authorized")
    try {
        const payload = jwt.verify(token,JWT_SECRET) as JwtPayload
        req.user = payload
    } catch {
        throw new HttpException(401,"invalid or expired token")
    }
    next();
}
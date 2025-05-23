import { plainToClass, plainToInstance } from "class-transformer";
import { NextFunction, Router ,Request, Response } from "express";
import { CreateDepartmentDto } from "../dto/create-department.dto";
import { error } from "winston";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { validate, validateOrReject } from "class-validator";
import HttpException from "../exception/httpException";
import DepartmentService from "../services/department.service";
import { checkRoles } from "../middleware/authorization.middleware";
import { EmployeeRole } from "../entities/employee.entity";
class DepartmentController{
    constructor(private departmentService:DepartmentService, router : Router){
        router.get("/",this.getAllDepartments.bind(this));
        router.post("/",checkRoles(EmployeeRole.HR),this.createDepartment.bind(this));//bind used to bind the method to the employee controller classs
        router.get("/:id",this.getDepartmentByID.bind(this));
        router.put("/:id",checkRoles(EmployeeRole.HR),this.updateDepartment); // bind not required because wwe defined updateemployee as arrrow function
        router.delete("/:id",checkRoles(EmployeeRole.HR),this.deleteDepartment);
    }

    async createDepartment(req: Request , res:Response , next:NextFunction){
        try {
        const createDepartmentDto = plainToInstance(CreateDepartmentDto,req.body);
        const errors = await validate(createDepartmentDto);
        if(errors.length > 0){
            console.log(JSON.stringify(errors));
            throw new HttpException(400,JSON.stringify(errors))
        }
        const savedDepartment = await this.departmentService.createDepartment(
            createDepartmentDto.name
        );
        res.status(201).send(savedDepartment);

    } catch (err){
        next(err);
    }
    }

    async getAllDepartments(req: Request , res:Response){
        const departments = await this.departmentService.getAllDepartments();
        res.status(200).send(departments);
    }

    async getDepartmentByID(req : Request , res : Response , next : NextFunction){
        try {
            const department = await this.departmentService.getDepartmentId(Number(req.params.id))
            if(!department){
                throw new HttpException(400,"Department not found")
            }
            res.status(200).send(department)
            
        }catch (err){
            next(err)
        }
    }

    updateDepartment = async (req:Request ,res:Response ,next: NextFunction) => {
        try{
            const id = Number(req.params.id)
            const updatedvalue = plainToInstance(CreateDepartmentDto,req.body)
            const errors = await validate(updatedvalue);
            if(errors.length > 0) {
                    console.log(JSON.stringify(errors));
                    throw new HttpException(400, JSON.stringify(errors));
            }
            await this.departmentService.updateDepartment(id,updatedvalue)
            res.status(204).send()
        } catch(err){
            next(err);
        }
    }

    deleteDepartment= async (req: Request , res: Response) => {
        const id = Number(req.params.id)
        await this.departmentService.deleteDepartment(id)
        res.status(205).send()

    }

}

export default DepartmentController;



import EmployeeService from "../services/employee.service";
import {  NextFunction , Request , Response , Router } from "express";
import employeeRouter from "../employee_router";
import HttpException from "../exception/httpException";
import { isEmail } from "../validators/emailValidator";
import { plainToInstance } from "class-transformer";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import { validate } from "class-validator";
import Address from "../entities/address.entity";

// import { authorizationMiddleware } from "../middleware/authorization.middleware"
import { checkRole } from "../middleware/authorization.middleware"; 
import { EmployeeRole } from "../entities/employee.entity";

class EmployeeController {
    // private employeeService: EmployeeServices;
    // constructor(employeeService : EmployeeServices) {
    //     this.employeeService = employeeService;
    // }
    //shortcut for this above three  lines
    constructor(private employeeService: EmployeeService, router : Router){
        router.get("/",this.getallEmployees.bind(this));
        router.post("/",checkRole(EmployeeRole.HR),this.createEmployee.bind(this));//bind used to bind the method to the employee controller classs
        router.get("/:id",this.getEmployeeById.bind(this));
        router.put("/:id",checkRole(EmployeeRole.HR),this.updateEmployee); // bind not required because wwe defined updateemployee as arrrow function
        router.delete("/:id",checkRole(EmployeeRole.HR),this.deleteEmployee);
    }
    
    async createEmployee(req: Request , res: Response ,next:NextFunction) {
            try {
                const createEmployeeDto = plainToInstance(CreateEmployeeDto, req.body);
                const errors = await validate(createEmployeeDto);
                if (errors.length > 0) {
                    console.log(JSON.stringify(errors));
                    throw new HttpException(400, JSON.stringify(errors));
                }
                const savedEmployee = await this.employeeService.createEmployee(
                    createEmployeeDto.email,
                    createEmployeeDto.name,
                    createEmployeeDto.age,
                    createEmployeeDto.role,
                    createEmployeeDto.address,
                    createEmployeeDto.password,
                    createEmployeeDto.employeeId,
                    createEmployeeDto.experience,
                    createEmployeeDto.dateOfJoining        ,            
                    createEmployeeDto.status  
                );
                        res.status(201).send(savedEmployee);
            } catch (error) {
            next(error);
            }
        
    }


    async getallEmployees(req:Request , res: Response) {
        const employees = await this.employeeService.getAllEmployees();
        res.status(200).send(employees)
    }

    async getEmployeeById(req:Request , res: Response ,next: NextFunction) {
        try{
             const employee = await this.employeeService.getEmployeeById(Number(req.params.id))
             if(!employee)
                // throw new Error('Employee not found')
                throw new HttpException(400,"employee not found")
             res.status(200).send(employee)
        } catch(err)    {
            // res.status(400).send("not found")
            console.log(err);
            next(err)
        }
        }

    updateEmployee  = async (req: Request , res: Response , next:NextFunction)=> {
        try{
            const id = Number(req.params.id)
            const updatedvalue = plainToInstance(CreateEmployeeDto,req.body)
            const errors = await validate(updatedvalue);
            if(errors.length > 0) {
                    console.log(JSON.stringify(errors));
                    throw new HttpException(400, JSON.stringify(errors));
            }
            await this.employeeService.updateEmployee(id,updatedvalue)
            res.status(204).send()
        } catch(err){
            next(err);
        }
    }


     deleteEmployee = async (req: Request , res: Response) => {
        const id = Number(req.params.id)
        await this.employeeService.deleteEmployee(id)
        res.status(205).send()

    }


}

export default EmployeeController;
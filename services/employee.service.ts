import EmployeeRepository from "../repositories/employee.repository";
import Employee, { EmployeeRole } from "../entities/employee.entity";
import Address from "../entities/address.entity";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import CreateAddressDto from "../dto/create-address.dto";
import bcrypt from "bcrypt";
import { LoggerService } from "./logger.service";

class EmployeeService{
    private logger = LoggerService.getInstance(EmployeeService.name)
    constructor (private employeeRepository: EmployeeRepository ){

    }

    async createEmployee(email:string, name:string ,age:number ,role: EmployeeRole ,address:CreateAddressDto , password:string) : Promise<Employee> {
        const newEmployee = new Employee()
        const newAddress = new Address()
        newAddress.line1 = address.line1
        newAddress.pincode = address.pincode
        newEmployee.name = name;
        newEmployee.email = email;
        newEmployee.age = age;
        newEmployee.role = role
        newEmployee.address = newAddress;
        newEmployee.password = await bcrypt.hash(password , 10);
        return this.employeeRepository.create(newEmployee);
    }

    async getAllEmployees():Promise<Employee[]> {
        return this.employeeRepository.findMany();  
        
    }

    async getEmployeeById(id:number) : Promise<Employee> {
        let employee = await this.employeeRepository.findOneBy(id)
        if(!employee){
            throw new Error("Employee not found");
        }
        return employee;
        
    }

    async updateEmployee (id :number,updatedEmployee : CreateEmployeeDto) {
        const existingEmployee = await this.employeeRepository.findOneBy(id);
        if(existingEmployee){
            const employee = new Employee();
            const newAddress= new Address();
            employee.name = updatedEmployee.name;
            employee.email = updatedEmployee.email;
            employee.age = updatedEmployee.age;
            newAddress.line1 = updatedEmployee.address.line1;
            newAddress.pincode = updatedEmployee.address.pincode;
            employee.address = newAddress;
            await this.employeeRepository.update(id,employee)
        }
    }

    async deleteEmployee(id:number){
        await this.employeeRepository.delete(id)
    }

    async getEmployeeByEmail(email:string){
        return this.employeeRepository.findbyEmail(email)
    }
}

export default EmployeeService;
import EmployeeRepository from "../repositories/employee.repository";
import Employee, { EmployeeRole, Status } from "../entities/employee.entity";
import Address from "../entities/address.entity";
import { CreateEmployeeDto } from "../dto/create-employee.dto";
import CreateAddressDto from "../dto/create-address.dto";
import bcrypt from "bcrypt";
import { LoggerService } from "./logger.service";
import Department from "../entities/department.entity";

class EmployeeService{
    private logger = LoggerService.getInstance(EmployeeService.name)
    constructor (private employeeRepository: EmployeeRepository ){

    }

    async createEmployee(email:string, name:string ,age:number ,role: EmployeeRole ,address:CreateAddressDto , password:string , 
                        employeeId : string , experience : number , dateOfJoining : Date , status : Status , departmentId :number) : Promise<Employee> {
        const newEmployee = new Employee()
        const newAddress = new Address()
        const dep = new Department()
        dep.id = departmentId
        newAddress.line1 = address.line1
        newAddress.line2 = address.line2
        newAddress.houseNo = address.houseNo
        newAddress.pincode = address.pincode
        newEmployee.name = name;
        newEmployee.email = email;
        newEmployee.age = age;
        newEmployee.role = role;
        newEmployee.employeeId = employeeId;
        newEmployee.experience = experience;
        newEmployee.dateOfJoining = dateOfJoining;
        newEmployee.status = status;
        newEmployee.department = dep;
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
            const dep = new Department();
            dep.id = updatedEmployee.departmentId;
            employee.name = updatedEmployee.name;
            employee.email = updatedEmployee.email;
            employee.age = updatedEmployee.age;
            employee.experience = updatedEmployee.experience;
            employee.employeeId = updatedEmployee.employeeId;
            employee.dateOfJoining = updatedEmployee.dateOfJoining;
            employee.status= updatedEmployee.status;
            employee.role= updatedEmployee.role;
            newAddress.id = existingEmployee.address.id // this is done so to keep the addres id same or it would crate new id
            newAddress.line1 = updatedEmployee.address.line1;
            newAddress.line2 = updatedEmployee.address.line2;
            newAddress.pincode = updatedEmployee.address.pincode;
            newAddress.houseNo = updatedEmployee.address.houseNo;
            employee.address = newAddress;
            employee.department = dep;
            await this.employeeRepository.update(id,employee)
        }
    }

    async deleteEmployee(id:number){
        const existingEmployee = await this.employeeRepository.findOneBy(id);
        if (existingEmployee){
            await this.employeeRepository.remove(existingEmployee);
        }
    }

    async getEmployeeByEmail(email:string){
        return this.employeeRepository.findbyEmail(email)
    }
}

export default EmployeeService;
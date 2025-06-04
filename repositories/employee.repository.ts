import { Repository } from "typeorm";
import Employee from "../entities/employee.entity";


class EmployeeRepository {
    constructor (private repository:Repository<Employee>){

    }

    async create(employee: Employee): Promise<Employee> {
        return this.repository.save(employee);
    }

    async findMany():Promise<Employee[]> {  //the section inside find is used to fethc the address table when employees is called
        return this.repository.find(
            {
                relations: {
                    address:true,
                    department:true
                }
            }
        );
    }

    async findOneBy (id:number): Promise<Employee> {
        return this.repository.findOne({ 
                where: {id},
                relations:{
                    address:true,
                    department:true
                } 
        }); 

    }
    async findbyEmail (email:string) : Promise<Employee> {
        return this.repository.findOneBy({email});
    }
    async remove(employee:Employee) : Promise<void>{
        // const employee = await this.repository.findOneBy({id:empId});
        await this.repository.softRemove(employee);
    }
    async update(id:number , employee : Employee) : Promise<void> {
        await this.repository.save({id,...employee});  // ...this is spread operaion
    }   
}
export default EmployeeRepository;
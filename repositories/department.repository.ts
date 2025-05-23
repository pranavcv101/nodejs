import { Repository } from "typeorm";
import Employee from "../entities/employee.entity";
import Department from "../entities/department.entity";
import { AuthService } from "../services/auth.services";

class DepartmentRepostory {
    constructor(private repository : Repository<Department> ){

    }

    async create(department : Department) : Promise<Department> {
        return this.repository.save(department);
    }

    async findMany(): Promise<Department[]>{
        return this.repository.find()
    }

    async findOneBy (id:number):Promise<Department> {
        return this.repository.findOne(
            {
                where:{id}
            }
        )
    }

    async remove(department:Department) : Promise<void>{
        await this.repository.softRemove(department)
    }
    

    async update(id: number , department: Department) : Promise<void>{
        await this.repository.save({id,...department})
    }
}
export default DepartmentRepostory;
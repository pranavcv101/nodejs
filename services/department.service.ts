import { ReturnDocument } from "typeorm";
import Department from "../entities/department.entity";
import DepartmentRepostory from "../repositories/department.repository";
import CreateAddressDto from "../dto/create-address.dto";
import { CreateDepartmentDto } from "../dto/create-department.dto";

class DepartmentService{
    constructor(private departmentRepository : DepartmentRepostory){

    }

    async createDepartment(depName : string){
        const newDepartment = new Department()
        newDepartment.name = depName
        return this.departmentRepository.create(newDepartment)
    }
    
    async getAllDepartments() : Promise<Department[]> {
        return this.departmentRepository.findMany()
    }

    async getDepartmentId(id:number ):Promise<Department> {
        let department = await this.departmentRepository.findOneBy(id);
        if(!department){
            throw new Error("Department not found");
        }
        return department;
    }

    async updateDepartment(id:number , updatedDepartment : CreateDepartmentDto) {
        const existingDepartment = await this.departmentRepository.findOneBy(id);
        if(existingDepartment){
            const newDepartment = new Department()
            newDepartment.name = updatedDepartment.name
            await this.departmentRepository.update(id,newDepartment)
        }
    }

   async deleteDepartment(id:number){
        const existingDepartment = await this.departmentRepository.findOneBy(id);
        if (existingDepartment){
            await this.departmentRepository.remove(existingDepartment);
        }
    }
    

}

export default DepartmentService;

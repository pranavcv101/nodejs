import {Column ,Entity, JoinColumn, ManyToOne, OneToOne  } from "typeorm"
import AbstractEntity from "./abstract.entity";
import Address from "./address.entity";
import Department from "./department.entity";

export enum EmployeeRole {
  UI = 'UI ',
  UX = 'UX',
  DEVELOPER = 'DEVELOPER' ,
  HR = 'HR'
}

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  PROBATION = 'PROBATION'
}

@Entity()
class Employee extends AbstractEntity{

    @Column({unique:true})
    email: string;


    @Column()
    name: string;

    @Column()
    age:number;
 
    @OneToOne(() => Address, (address) => address.employee, {
    cascade: true,
    onDelete:'CASCADE'
    })
    address: Address


    @Column()
    password : string;

    @Column({
      type:'enum' , 
      enum : EmployeeRole,
      default: EmployeeRole.DEVELOPER
    })
    role:EmployeeRole

    @Column()
    employeeId:string

    @Column()
    dateOfJoining : Date;

    @Column()
    experience : number


    @Column({
      type : 'enum',
      enum : Status,
      default :Status.PROBATION
    })
    status : Status

    @ManyToOne(() => Department , (department) => department.employee)
      department:Department
    }



  
  export default Employee;
  
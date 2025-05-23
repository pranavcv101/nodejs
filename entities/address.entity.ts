import {Column, Entity , OneToOne, PrimaryGeneratedColumn ,JoinColumn, ColumnTypeUndefinedError} from "typeorm"
import AbstractEntity from "./abstract.entity";
import Employee from "./employee.entity";

@Entity()
class Address extends AbstractEntity{

    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    line1 : string;

    @Column()
    pincode: string;

    @OneToOne(() => Employee, (employee) => employee.address, {
     onDelete: 'CASCADE'
    })

    @JoinColumn()
    employee: Employee;

    @Column()
    line2:string

    @Column()
    houseNo:string

}

export default Address;
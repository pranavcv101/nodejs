
import { IsEmail, IsEnum ,isNotEmpty,IsNotEmpty, IsNumber, IsString, MinLength, ValidateNested , IsDate, IsDateString} from "class-validator";
import { CreateAddressDto } from "./create-address.dto";
import { Type } from "class-transformer";
import Employee, { Status } from "../entities/employee.entity";
import { EmployeeRole } from "../entities/employee.entity";


export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  age: number;

  @ValidateNested()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  password : string


  @IsEnum(EmployeeRole)
  role:EmployeeRole

  @IsEnum(Status)
  status : Status

  @IsNumber()
  @IsNotEmpty()
  experience : number;

  @IsString()
  @IsNotEmpty()
  employeeId : string

  @IsDateString()
  dateOfJoining : Date




}
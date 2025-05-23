import { describe, test  ,it, beforeEach ,expect , jest} from '@jest/globals';
import { when } from 'jest-when';
import { mock, MockProxy } from 'jest-mock-extended';
import EmployeeRepository from '../../repositories/employee.repository';
import EmployeeService from '../../services/employee.service'
import Employee from '../../entities/employee.entity';

describe('EmployeeService', () => {

    let employeeRepository:MockProxy<EmployeeRepository>;
    let employeeService: EmployeeService;
    beforeEach(()=>{
        //create a type-safe mock of the resposit
        employeeRepository = mock<EmployeeRepository>();
        employeeService = new EmployeeService(employeeRepository);

    });

    describe('getEmployeeByid', () => {

            it('should return value when employee exists', async () => {
                const mockEmployee = {id:123 , name:"emplyee name" } as Employee;
                when(employeeRepository.findOneBy).calledWith(123).mockReturnValue(mockEmployee)
                const user = await employeeService.getEmployeeById(123);
                expect(employeeRepository.findOneBy).toHaveBeenCalledWith(123);
                expect(user).toStrictEqual(mockEmployee)
            })

            it('should throw errror for no user', () => {
                const mockEmployee = null;
                when(employeeRepository.findOneBy).calledWith(123).mockReturnValue(mockEmployee)
                // const user = await employeeService.getEmployeeById(123)
                expect(employeeService.getEmployeeById(123)).rejects.toThrow("Employee not found");
                expect(employeeRepository.findOneBy).toHaveBeenCalledWith(123);

            })

            it
    });
})
import DepartmentService from "../../services/department.service"
import DepartmentRepository from "../../repositories/department.repository"
import { mock, MockProxy } from 'jest-mock-extended';
import { when } from 'jest-when';
import Department from "../../entities/department.entity";
import { CreateDepartmentDto } from "../../dto/create-department.dto";

describe('DepartmentService', () => {
    let departmentRepository: MockProxy<DepartmentRepository>;
    let departmentDto: MockProxy<CreateDepartmentDto>;
    let departmentService: DepartmentService;

    beforeEach(() => {
        departmentRepository = mock<DepartmentRepository>();
        departmentDto = mock<CreateDepartmentDto>();
        departmentService = new DepartmentService(departmentRepository);
    });

    describe('createDepartment', () => {
        it("should create department successfully", async () => {
            const mockDepartmentDto = departmentDto;
            const createdDepartment = { id: 1, name: mockDepartmentDto.name } as Department;

            when(departmentRepository.create).calledWith(expect.objectContaining({ name: mockDepartmentDto.name })).mockReturnValue(createdDepartment);

            const result = await departmentService.createDepartment(mockDepartmentDto);

            expect(result).toEqual(createdDepartment);
            expect(departmentRepository.create).toHaveBeenCalledWith(expect.objectContaining({ name: mockDepartmentDto.name }));
        });
    });

    describe('updateDepartment', () => {
        it("should update department successfully", async () => {
            const mockDepartmentDto = departmentDto;
            const id = 1;

            when(departmentRepository.update).calledWith(id, expect.objectContaining({ id: id, name: mockDepartmentDto.name })).mockReturnValue(Promise.resolve());

            await departmentService.updateDepartment(id, mockDepartmentDto);

            expect(departmentRepository.update).toHaveBeenCalledWith(id, expect.objectContaining({ id: id, name: mockDepartmentDto.name }));
        });
    });

    describe('getAllDepartments', () => {
        it("should return all departments from repository", async () => {
            const mockDepartments = [
                { id: 1, name: "Department 1" } as Department,
                { id: 2, name: "Department 2" } as Department
            ];
            when(departmentRepository.findMany).calledWith().mockReturnValue(mockDepartments);

            const result = await departmentService.getAllDepartments();

            expect(result).toEqual(mockDepartments);
            expect(departmentRepository.findMany).toHaveBeenCalledWith();
        });

        it("should return empty array when no departments exist", async () => {
            const mockDepartments: Department[] = [];
            when(departmentRepository.findMany).calledWith().mockReturnValue(mockDepartments);

            const result = await departmentService.getAllDepartments();

            expect(result).toEqual(mockDepartments);
            expect(departmentRepository.findMany).toHaveBeenCalledWith();
        });
    });

    describe('getDepartmentByName', () => {
        it("should return department when found by name", async () => {
            const name = "HR";
            const mockDepartment = { id: 1, name: name } as Department;

            when(departmentRepository.findByName).calledWith(name).mockReturnValue(mockDepartment);

            const result = await departmentService.getDepartmentByName(name);

            expect(result).toEqual(mockDepartment);
            expect(departmentRepository.findByName).toHaveBeenCalledWith(name);
        });

        it("should return null when department not found by name", async () => {
            const name = "Nonexistent";
            const mockDepartment = null;

            when(departmentRepository.findByName).calledWith(name).mockReturnValue(mockDepartment);

            const result = await departmentService.getDepartmentByName(name);

            expect(result).toEqual(mockDepartment);
            expect(departmentRepository.findByName).toHaveBeenCalledWith(name);
        });
    });

    describe('deleteDepartmentById', () => {
        it("should call delete on repository with given id", async () => {
            const id = 1;

            when(departmentRepository.delete).calledWith(id).mockReturnValue(Promise.resolve());

            await departmentService.deleteDepartmentById(id);

            expect(departmentRepository.delete).toHaveBeenCalledWith(id);
        });
    });
});
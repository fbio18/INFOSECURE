import Employee from "../entities/Employee";
import EmployeeRepository from "../repositories/employee.repository";
import { InvalidData, InvalidId } from "./errorMessages";
import { employeeFilter, validateEmployeeFilters } from "./filters-validation";
import { validateUpdateEmployeeData } from "./update-validation";
import { validateEmployeeData, validateNumberId } from "./validation";

export async function createEmployeeService(employeeData: Partial<Employee>): Promise<Employee> {
    const validatedEmployeeData = validateEmployeeData(employeeData);

    return await EmployeeRepository.createEmployee(validatedEmployeeData);
}

export async function readEmployeeService(employeeId: number) {
    if (!validateNumberId(employeeId)) throw new InvalidId("number");

    return await EmployeeRepository.readEmployee(employeeId);
}

export async function readAllEmployeesService(): Promise<Employee[]> {
    return await EmployeeRepository.readAllEmployees();
}

export async function readEmployeesByFilterService(employeeFilters: employeeFilter): Promise<Employee[]> {
    if (!validateEmployeeFilters(employeeFilters)) throw new InvalidData();

    return await EmployeeRepository.readEmployeesByFilter(employeeFilters);
}

export async function updateEmployeeService(employeeId: number, employeeUpdatedData: Partial<Employee>): Promise<Employee> {
    if (!validateNumberId(employeeId)) throw new InvalidId("number");
    if (!validateUpdateEmployeeData(employeeUpdatedData)) new InvalidData();

    return await EmployeeRepository.updateEmployee(employeeId, employeeUpdatedData);
}

export async function deleteEmployeeService(employeeId: number): Promise<{ message: string, statusCode: number }> {
    if (!validateNumberId(employeeId)) throw new InvalidId();

    return await EmployeeRepository.deleteEmployee(employeeId);
}

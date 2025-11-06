import Employee from "../entities/Employee";
import EmployeeRepository from "../repositories/employee.repository";
import { InvalidData } from "./errorMessages";
import { EmployeeValidated, validateEmployeeData } from "./validation";

export async function createEmployeeService(employeeData: Partial<Employee>): Promise<Employee> {
    const validatedEmployeeData = validateEmployeeData(employeeData);

    return await EmployeeRepository.createEmployee(validatedEmployeeData);
}

export async function readEmployeeService(employeeId: number) {
    return await EmployeeRepository.readEmployee(employeeId);
}

export async function readAllEmployeesService(): Promise<Employee[]> {
    return await EmployeeRepository.readAllEmployees();
}

export async function updateEmployeeService() {
    await EmployeeRepository.updateEmployee();
}

export async function deleteEmployeeService(employeeId: number) {
    await EmployeeRepository.deleteEmployee(employeeId);
}

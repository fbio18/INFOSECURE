import Employee from "../entities/Employee";
import EmployeeRepository from "../repositories/employee.repository";
import { InvalidData } from "./errorMessages";
import { validateEmployeeData } from "./validation";

export async function createEmployeeService(employeeData: Partial<Employee>): Promise<Employee> {
    if (!validateEmployeeData(employeeData)) throw new InvalidData();

    return await EmployeeRepository.createEmployee(employeeData);
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

import Employee from "../entities/Employee";
import EmployeeRepository from "../repositories/employee.repository";
import { InvalidId } from "./errorMessages";
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

export async function updateEmployeeService() {
    await EmployeeRepository.updateEmployee();
}

export async function deleteEmployeeService(employeeId: number) {
    await EmployeeRepository.deleteEmployee(employeeId);
}

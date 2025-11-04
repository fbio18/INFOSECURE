import Employee from "../entities/Employee";
import EmployeeRepository from "../repositories/employee.repository";

export async function createEmployeeService() {
    return await EmployeeRepository.createEmployee();
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

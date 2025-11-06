import AppDataSource from "../db";
import Employee from "../entities/Employee";
import { assignEmployeeRelationService, readUserService } from "../services/user.services";

// Las validaciones de los datos se hacen en el módulo de servicios. No cambiar los "as [tipo]"

const EmployeeRepository = AppDataSource.getRepository(Employee).extend({
    async createEmployee(employeeData: Partial<Employee>): Promise<Employee> {
        const userId = employeeData.user as unknown as number;
        const user = await readUserService(userId);

        await this
        .createQueryBuilder("employee")
        .insert()
        .values({
            dni: employeeData.dni as string,
            surnames: employeeData.surnames as string,
            names: employeeData.names as string,
            salary: employeeData.salary as number,
            user: user
        })
        .execute();


        const returnedEmployee = await this
        .createQueryBuilder("employee")
        .orderBy("employee.employee_id", "DESC")
        .getOne();

        if (!returnedEmployee) throw new Error();

        assignEmployeeRelationService(userId, returnedEmployee.employee_id);

        return returnedEmployee;
    },

    async readEmployee(employeeId: number) {
        const employee = await this
        .createQueryBuilder("employee")
        .where("employee.employee_id = :employeeId", { employeeId })
        .getOne();

        if (!employee) throw new Error();

        return employee;
    },

    async readAllEmployees(): Promise<Employee[]> {
        const employees = await this
        .createQueryBuilder()
        .getMany();

        if (!employees) throw new Error();

        return employees;
    },

    async updateEmployee() {
        const updatedEmployee = await this
        .createQueryBuilder()
        .update()
        .set({})
        .where({})
        .execute();

        if (!updatedEmployee) throw new Error();

        return updatedEmployee;
    },

    async deleteEmployee(employeeId: number) {
        await this
        .createQueryBuilder("employee")
        .delete()
        .where("employee.employee_id = :employeeId", { employeeId })
        .execute();
    }
})

export default EmployeeRepository;

import AppDataSource from "../db";
import Employee from "../entities/Employee";
import { assignEmployeeRelationService, readUserService } from "../services/user.services";
import { EmployeeValidated } from "../services/validation";

// Las validaciones de los datos se hacen en el módulo de servicios. No cambiar los "as [tipo]"

const EmployeeRepository = AppDataSource.getRepository(Employee).extend({
    async createEmployee(employeeData: EmployeeValidated): Promise<Employee> {
        const user = await readUserService(employeeData.user);

        await this
        .createQueryBuilder("employee")
        .insert()
        .values({
            dni: employeeData.dni,
            surnames: employeeData.surnames,
            names: employeeData.names,
            salary: employeeData.salary,
            user: user
        })
        .execute();


        const returnedEmployee = await this
        .createQueryBuilder("employee")
        .orderBy("employee.employee_id", "DESC")
        .getOne();

        if (!returnedEmployee) throw new Error();

        assignEmployeeRelationService(employeeData.user, returnedEmployee.employee_id);

        return returnedEmployee;
    },

    async readEmployee(employeeId: number) {
        const employee = await this
        .createQueryBuilder("employee")
        .leftJoinAndSelect("employee.user", "user")
        .where("employee.employee_id = :employeeId", { employeeId })
        .getOne();

        if (!employee) throw new Error();

        return employee;
    },

    async readAllEmployees(): Promise<Employee[]> {
        const employees = await this
        .createQueryBuilder()
        .leftJoinAndSelect("employee.user", "user")
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

import AppDataSource from "../db";
import Employee from "../entities/Employee";
import User from "../entities/User";

const EmployeeRepository = AppDataSource.getRepository(Employee).extend({
    async createEmployee(dni: string, surnames: string, names: string, salary: number, user: Partial<User>) {
        await this
        .createQueryBuilder("employee")
        .insert()
        .values({
            dni: dni,
            surnames: surnames,
            names: names,
            salary: salary,
        })
        .execute();

        const returnedEmployee = await this
        .createQueryBuilder("employee")
        .orderBy("employee.employee_id", "DESC")
        .getOne();

        if (!returnedEmployee) throw new Error();

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

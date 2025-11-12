import AppDataSource from "../db";
import Employee from "../entities/Employee";
import { NotFound } from "../services/errorMessages";
import { assignEmployeeRelationService, readUserService } from "../services/user.services";
import { EmployeeValidated } from "../services/validation";
import UserRepository from "./user.repository";

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
        .createQueryBuilder("employee")
        .leftJoinAndSelect("employee.user", "user")
        .getMany();

        if (!employees) throw new NotFound("employee");

        return employees;
    },

    async updateEmployee(employeeId: number, updatedEmployeeData: Partial<Employee>): Promise<Employee> {
        await this
        .createQueryBuilder()
        .update()
        .set(updatedEmployeeData)
        .where("employee_id = :employeeId", { employeeId })
        .execute();

        const updatedEmployee = await this.readEmployee(employeeId);

        return updatedEmployee;
    },

    async deleteEmployee(employeeId: number): Promise<{ message: string, statusCode: number }> {
        await UserRepository.unassignEmployeeRelation(employeeId);

        await this
        .createQueryBuilder("employee")
        .delete()
        .where("employee.employee_id = :employeeId", { employeeId })
        .execute();

        return { message: "El empleado fue borrado con éxito", statusCode: 200 };
    },

    async unassignUserRelation(userId: number): Promise<void> {
        const employee = await this
        .createQueryBuilder("employee")
        .leftJoinAndSelect("employee.user", "user")
        .where("user.user_id = :userId", { userId })
        .getOne();

        await this
        .createQueryBuilder()
        .relation(Employee, "user")
        .of(employee)
        .set(null);
    }
})

export default EmployeeRepository;

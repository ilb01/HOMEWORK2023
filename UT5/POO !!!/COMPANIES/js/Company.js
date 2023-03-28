import { Employees } from './Employee.js';
export class Company  {
    constructor(id, name, web, email, employees) {
        this.id=id;
        this.name=name;
        this.web=web;
        this.email=email;
        this.employees=employees;
    }
    // Para crear una tarjeta 
    render(){
        // coger el constructor de employees 
        let employeesHTML="";
        this.employees.forEach(emp => {
            employeesHTML+=emp.render();
        });
        return `
        <div>${this.id}</div>
        <div>${this.name}</div>
        <div>${this.web}</div>
        <div>${this.email}</div>
        <div>${employeesHTML}
        <p>Salario Total: €</p></div>
        `
    }
}

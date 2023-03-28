// siempre export!!
export class Employees {
    constructor(dni, name, surname, salary) {
        this.dni=dni,
        this.name=name,
        this.surname=surname;
        this.salary=salary;
    }
    
    render() {
        return `<p>${this.name} ${this.surname} (${this.salary}) </p>
        `;
    }
}
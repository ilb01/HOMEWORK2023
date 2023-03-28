import { Company } from "./Company.js";
import { Employees } from './Employee.js';

const container = document.querySelector('#companies-container');

function init() {
    getCompanies();
}
init();

// TRAER EL JSON   
function getCompanies() {
    fetch('./data/companies.json') //PROMESA
    .then(res => res.json())
    .then(data=>{
        data.forEach(com => {
            
            const employeesList = []
            com.employees.forEach(emp => {
                const empOBJ = new Employees(emp.dni, emp.name, emp.surname, emp.salary);
                
                employeesList.push(empOBJ);
            });
            // ne --> enter
            const company = new Company(com.id, com.name, com.web, com.email, employeesList);  

            container.innerHTML+=company.render();
        });
    }
    );
} 

// POO --> PROGRAMACIÓN ORIENTADA de OBJECTOS
//  declarar una clase
// export --> para exportar una clase desde javascript
import {Author} from './author.js'
export class book {
    static tax = "10%";
    static stock = 10;

    // atributo privado
    #active = false;

    constructor(isbn, title, authorsList, release, price ){
        // inicializar nuestro objecto (propiedades)
        // cogen los propiedades de los atributo
        // this se refiere a un objecto
        this.isbn = isbn;
        this.title = title;
        this.authorsList=authorsList;
        this.release = release;
        this.price = price;
        book.stock=book.stock-1;
    }
    // metodo = función
    priceWithTax(){
        // this.price coge a la propiedad
        return this.price*1.1
    }
    render(){
        let authors="";
        authorsList.forEach(author => {
            authors+=author.render();
        });
        // return --> nos delvuelve 
        return `
        <article>
        <h5>${this.isbn}</h5>
        <h2>${this.title}</h2>
        <h6>${authors}</h6>
        <p>${this.release}</p>
        <p class="price">${this.price}€</p>
    </article>` 
    }

    // método estático --> método que no pertenece a ninguna clase en concreto 
    // static tax(){
    //     return "10%"
    // }

    sale(){
        if (this.#active) {
            console.log("Se puede vender");
        }
        else{
            console.log("No se puede vender");
        }
    };
}


// clase hijo llamada a la clase padre
// class Comic extends book {
//     constructor(isbn, title, release, price, volume) {
        // super() --> metodoe lo que hacer llamar a los atributos que ya existe
//         super(isbn, title, release, price);
//         this.volume=volume;
//     }
// }

// new = sirve para crear una nueva clase, COMO MISMO NOMBRE DE VARIABLE
// const book1 = new book ("12345232", "Harry Potter", 2009, 10,90);
// const book2 = new book ("12345434", "Cars", 2019, 11,90);
// const book3 = new book ("12345443", "Avatar", 2019, 30,90);
// console.log(book1.priceWithTax());
// console.log(book1.render());

// console.log("El stock de libro es:", book.stock);
// book1.sale();





// const comic1 = new Comic ("523454","Pitufos", 2002, 10,05, 1);
// const comic2 = new Comic ("543244","Tintin", 2001, 40,05, 1);
// const comic3 = new Comic ("343454","Super Mario Bros", 1999, 42,05, 1);


// console.log("Precio comic:", comic1.priceWithTax(), comic2.priceWithTax(), comic3.priceWithTax());
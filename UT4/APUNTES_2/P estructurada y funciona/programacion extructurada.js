const productsList = [
  {
    "id": 1,
    "name": "TV Cinema plus",
    "price": 300.5,
    "stock": true,
    "category": "ELEC",
    "brand": "Samsung",
    "onSale": true,
    "discount": 10,
  },
  {
    "id": 2,
    "name": "TV Panoramic colors",
    "price": 490,
    "stock": true,
    "category": "ELEC",
    "brand": "Samsung",
    "onSale": true,
    "discount": 10,
  },
  {
    "id": 3,
    "name": "TV Family Cinema Max",
    "price": 800,
    "stock": true,
    "category": "ELEC",
    "brand": "Samsung",
    "onSale": false,
    "discount": 0,
  },
  {
    "id": 4,
    "name": "TV HD8 REALISTIC",
    "price": 1000,
    "stock": true,
    "category": "ELEC",
    "brand": "Samsung",
    "onSale": false,
    "discount": 0,
  },

  {
    "id": 5,
    "name": "HP 17'' premium",
    "price": 500.33,
    "stock": false,
    "category": "LAPTOP",
    "brand": "HP",
    "onSale": false,
    "discount": 0,
  },
  {
    "id": 6,
    "name": "MSI 15'' gaming pro",
    "price": 750,
    "stock": true,
    "category": "LAPTOP",
    "brand": "MSI",
    "onSale": true,
    "discount": 20,
  },
  {
    "id": 7,
    "name": "HP 14'' office",
    "price": 580,
    "stock": false,
    "category": "LAPTOP",
    "brand": "HP",
    "onSale": false,
    "discount": 0,
  },
  {
    "id": 8,
    "name": "Samsung 17'' premium",
    "price": 500,
    "stock": true,
    "category": "LAPTOP",
    "brand": "Samsung",
    "onSale": false,
    "discount": 0,
  },
  {
    "id": 9,
    "name": "HP snow special",
    "price": 600,
    "stock": true,
    "category": "COMPUTER",
    "brand": "HP",
    "onSale": false,
  },
  {
    "id": 10,
    "name": "MSI-3456RW gaming presario total graphic",
    "price": 750,
    "stock": true,
    "category": "COMPUTER",
    "brand": "MSI",
    "onSale": true,
    "discount": 30,
  },
  {
    "id": 11,
    "name": "HP TOWER GAMING",
    "price": 980,
    "stock": false,
    "category": "COMPUTER",
    "brand": "HP",
    "onSale": true,
    "discount": 50,
  },
  {
    "id": 12,
    "name": "Tower superior",
    "price": 530,
    "stock": true,
    "category": "COMPUTER",
    "brand": "Samsung",
    "onSale": false
  },
  {
    "id": 13,
    "name": "My  big OPPO",
    "price": 150,
    "stock": true,
    "category": "MOBILE",
    "brand": "OPPO",
    "onSale": false,
  },
  {
    "id": 14,
    "name": "Samsung revolution 20222",
    "price": 350,
    "stock": true,
    "category": "MOBILE",
    "brand": "Samsung",
    "onSale": true,
    "discount": 30,
  },
  {
    "id": 15,
    "name": "Moto 3D for you",
    "price": 280,
    "stock": true,
    "category": "MOBILE",
    "brand": "Motorola",
    "onSale": true,
    "discount": 20,
  },
  {
    "id": 16,
    "name": "SamgungHR special gaming",
    "price": 830,
    "stock": true,
    "category": "MOBILE",
    "brand": "Samsung",
    "onSale": false
  },
  {
    "id": 17,
    "name": "The Witcher",
    "price": 30,
    "stock": true,
    "category": "GAME",
    "brand": "PLAYSTATION",
    "onSale": false,
  },
  {
    "id": 18,
    "name": "Assassin's Creed",
    "price": 50,
    "stock": true,
    "category": "GAME",
    "brand": "PLAYSTATION",
    "onSale": true,
    "discount": 30,
  },
  {
    "id": 19,
    "name": "FIFA 2022",
    "price": 40,
    "stock": true,
    "category": "GAME",
    "brand": "PC",
    "onSale": true,
    "discount": 20,
  },
  {
    "id": 20,
    "name": "The edge of camelor",
    "price": 30,
    "stock": true,
    "category": "GAME",
    "brand": "XBOX",
    "onSale": false
  },
];

// Funció que retorni el producte més car
function ex1Filter(products) {

  let productExpensive;
  for (const pro of products) {
    if (!productExpensive || pro.price > productExpensive.price) {
      productExpensive = pro;
    }
  }
  return productExpensive;
}
//console.log("Ex.1:", ex1Filter(productsList));

// Funció que retorni el producte més barat
function ex2Filter(products) {
  let productCheapest;
  for (const pro of products) {
    if (!productCheapest || pro.price < productCheapest.price) {
      productCheapest = pro;
    }
  }
  return productCheapest;
}
//console.log("Ex.2:", ex2Filter(productsList));

// Funció que retorni els productes entre 100 i 500 euros de la categoria “ELEC”
function ex3Filter(products) {
  let newProducts = [];
  for (const pro of products) {
    if (pro.price > 100 && pro.price < 500 && pro.category === "ELEC") {
      newProducts.push(pro);
    }
  }
  return newProducts;
}
//console.log("Ex.3:", ex3Filter(productsList));


// Funció que retorni els productes entre 500 i 600 euros de la categoria “COMPUTER” o “LAPTOP”.
function ex4Filter(products) {
  let newProducts = [];
  for (const pro of products) {
    if ((pro.price > 500 && pro.price < 600) &&
      (pro.category === "COMPUTER" || pro.category === "LAPTOP")
    ) {
      newProducts.push(pro);
    }
  }
  return newProducts;
}
//console.log("Ex.4:", ex4Filter(productsList));

// Funció que retorni els productes en stock que incloguin en el seu nom la paraula “gaming”
function ex5Filter(products) {
  let newProducts = [];
  for (const pro of products) {
    if (pro.stock &&
      pro.name.toUpperCase().includes("GAMING")
    ) {
      newProducts.push(pro);
    }
  }
  return newProducts;
}
// console.log("Ex.5:", ex5Filter(productsList));

// Funció que retorni verdader o false si hi ha qualque producte de la marca samsung i la categoria “MOBILE”
function ex6Filter(products) {
  for (const pro of products) {
    if (pro.brand.toUpperCase() === "SAMSUNG" &&
      pro.category.toUpperCase() === "MOBILE"
    ) {
      return true;
    }
  }
  return false;
}
//console.log("Ex.6:", ex6Filter(productsList));

// Funció que retorni verdader o false si hi ha qualque producte sense stock
function ex7Filter(products) {
  for (const pro of products) {
    if (!pro.stock) return false;
    //console.log(pro.id); 
  }
  return true;
}
//console.log("Ex.7:", ex7Filter(productsList));

// Funció que retorni un nou array només amb els camps id, name i price de cada producte
function ex8Filter(products) {
  let arrayProducts = [];
  for (const pro of products) {
    let newProduct = {
      "id": pro.id,
      "name": pro.name,
      "price": pro.price
    };
    arrayProducts.push(newProduct);
  }
  return arrayProducts;
}
//console.log("Ex.8:", ex8Filter(productsList));

/*
Funció que retorni un nou array només amb els camps name, category  i price, però seguint aquests requeriments:
- Preu amb la moneda euro inclosa.
- Nom en majúscules
- La categoria només en les tres primeres lletres
*/
function ex9Filter(products) {
  let arrayProducts = [];
  for (const pro of products) {
    let newProduct = {
      "nom": pro.name.toUpperCase(),
      "preu": (pro.price + " €").replace(".", ","),
      "categoria": pro.category.substring(0, 3)
    };
    arrayProducts.push(newProduct);
  }
  return arrayProducts;
}
console.log("Ex.9:", ex9Filter(productsList));

// Funció que retorni verdader o false si tots els productes es troben en stock i preu superior a 0.
function ex10Filter(products) {
  for (const pro of products) {
    if (!pro.stock || pro.price <= 0) return false;
  }
  return true;
}
//console.log("Ex.10:", ex10Filter(productsList));

// Funció que retorni el producte (primer que trobi a la llista) que sigui de la categoria “GAME” i amb el nom “The Witcher”
function ex11Filter(products) {
  for (const pro of products) {
    if (pro.category === "GAME" &&
      pro.name.includes("The Witcher"))
      return pro;
  }
  // Tornam objecte buit
  return {};
}
//console.log("Ex.11:", ex11Filter(productsList));

// Funció que retorni el producte (primer que trobi a la llista) que sigui de la categoria “COMPUTER”, amb el nom “presario” i marca “MSI”.
function ex12Filter(products) {
  for (const pro of products) {
    if (pro.category === "COMPUTER" &&
      pro.name.includes("presario") &&
      pro.brand === "MSI"
    )
      return pro;
  }
  // Tornam objecte buit
  return {};
}
console.log("Ex.12:", ex12Filter(productsList));

// Funció que torni els ordinadors o portàtils amb un descompte superior o igual a 50%  i afegint una propietat amb el seu preu de descompte.
function ex13Filter(products) {
  let arrayProducts = [];
  for (let pro of products) {
    if ((pro.category === "COMPUTER" || pro.category === "LAPTOP") &&
      pro.discount >= 50
    ) {
      let discountPrice = (pro.price * pro.discount / 100);
      pro.finalPrice = pro.price - discountPrice;
      arrayProducts.push(pro);
    }
  }
  return arrayProducts;
}
console.log("Ex.13:", ex13Filter(productsList));

// Funció que retorni els ordinadors diferents a la marca “HP”, en stock i que sense camp oferta.
function ex14Filter(products) {
  let arrayProducts = [];
  for (let pro of products) {
    if (pro.brand != "HP" && pro.category === "COMPUTER" && pro.stock && !pro.onSale) {
      arrayProducts.push(pro);
    }
  }
  return arrayProducts;
}
console.log("Ex.14:", ex14Filter(productsList));

// Funció que retorni el producte amb el codi/id 18, però només els camps id, name i price.
function ex15Filter(products) {
  let product = {};
  for (let pro of products) {
    if (pro.id === 18) {
      const product = {
        "id": 18,
        "name": pro.name,
        "price": pro.price,
      };
      return pro;
    }
  }
  return product;
}
console.log("Ex.15:", ex15Filter(productsList));
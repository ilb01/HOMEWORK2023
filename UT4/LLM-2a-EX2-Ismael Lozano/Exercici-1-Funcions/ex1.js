
const cars = [
    { "id": 1, "name": "Seat León 1.2", "brand": "Seat", "doors": 3, "category": "SUP", "priceDay": 50 },
    { "id": 2, "name": "Tesla Fusion", "brand": "Tesla", "doors": 3, "category": "BASIC", "priceDay": 50 },
    { "id": 3, "name": "Seat Ibiza", "brand": "Seat", "doors": 5, "category": "BASIC", "priceDay": 20 },
    { "id": 4, "name": "Fort Cupa", "brand": "Ford", "doors": 3, "category": "SUP", "priceDay": 30 },
    { "id": 5, "name": "Tesla hibrit", "brand": "Tesla", "doors": 5, "category": "SUP", "priceDay": 300 },
    { "id": 6, "name": "Fort Supra", "brand": "Ford", "doors": 5, "category": "BASIC", "priceDay": 40 },
];

// Funció que torni el cotxe de lloguer de 3 portes més car. Codifica-la amb programació estructurada.
function ex1_1(list) {
    let cocheCaro;
    for (let car of list) {
        if (!cocheCaro || car.doors === 3 && car.price > cocheCaro.price) {
            cocheCaro = car;
        }
    }
    return cocheCaro;
}
console.log("ex1_1", ex1_1(cars));

// Funció que torni una llista de cotxes de la marca Ford,  amb preu inferior igual a 40 euros per dia i categoria basic. Codifica-la amb programació estructurada.
function ex1_2(list) {
    let cocheFord = [];
    for (let car of list) {
        if (car.brand === "Ford" && car.category === "BASIC" && car.priceDay <= 40) {
            cocheFord.push(car);
        }
    }
    return cocheFord;
}
console.log("ex1_2", ex1_2(cars));

// Funció que torni el cotxe de la marca Tesla o Ford i de la categoria superior. Codifica-la amb programació funcional.
function ex1_3(list) {
    return list.find(car => car.brand === "Tesla" || car.brand === "Ford" && car.category === "SUP");

}
console.log("ex1_3", ex1_3(cars));

// Funció que torni una llista de cotxes que NO sigui de la marca Ford i preu entre 20 i 100 euros per dia. Aquesta llista ha d’estar ordenada per nom del cotxe. Codifica-la amb programació funcional.
function ex1_4(list) {
    let buscarCoches = list.filter(car => car.brand != "Ford" && car.priceDay >= 20 && car.priceDay <= 100);
    return buscarCoches.sort((a, b) => {
        let nameA = a.name;
        let nameB = b.name;
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    }
    )
}
console.log("ex1_4", ex1_4(cars));
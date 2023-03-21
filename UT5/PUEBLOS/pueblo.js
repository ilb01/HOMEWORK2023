listaPueblos = [
    {
      "id_ciudad": 10,
      "km": "124",
      "pueblo": {
        "id_pueblo": 12,
        "km": "22",
        "poblacion": 22
      }
    },
    {
      "id_ciudad": 11,
      "km": "245",
      "pueblo": {
        "id_pueblo": 13,
        "km": "55",
        "poblacion": 13
      }
    }
  ]
  
  let pueblo = listaPueblos.find(x => x.pueblo.id_pueblo == 12);
  console.log(pueblo);
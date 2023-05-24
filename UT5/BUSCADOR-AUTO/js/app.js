// Obtener referencias a elementos del DOM
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

// Agregar evento de escucha al formulario
document.querySelector('form').addEventListener('submit', function(event) {
  event.preventDefault(); // Evitar que el formulario se envíe

  const query = searchInput.value; // Obtener la consulta de búsqueda

  // Llamar a la función de búsqueda y mostrar los resultados
  const results = search(query);
  displayResults(results);
});

// Función de búsqueda (aquí puedes implementar la lógica de búsqueda)
function search(query) {
  // Realizar la lógica de búsqueda y devolver los resultados
  // Puedes utilizar AJAX para realizar una solicitud a un servidor o buscar en un conjunto de datos local
  // En este ejemplo, simplemente retornaremos un arreglo estático de resultados
  const results = [
    'Resultado 1',
    'Resultado 2',
    'Resultado 3'
  ];

  return results;
}

// Función para mostrar los resultados en el DOM
function displayResults(results) {
  // Limpiar los resultados anteriores
  searchResults.innerHTML = '';

  // Mostrar los nuevos resultados
  results.forEach(function(result) {
    const resultElement = document.createElement('p');
    resultElement.textContent = result;
    searchResults.appendChild(resultElement);
  });
}
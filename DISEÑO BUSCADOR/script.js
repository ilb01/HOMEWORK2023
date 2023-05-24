// Obtener los elementos del DOM
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const searchResults = document.getElementById('search-results');

// Función de búsqueda
function search() {
  const searchTerm = searchInput.value.trim();
  
  // Realizar la lógica de búsqueda aquí
  // ...

  // Mostrar los resultados de búsqueda
  searchResults.innerHTML = `Resultados para: ${searchTerm}`;
}

// Manejar el evento de clic en el botón de búsqueda
searchButton.addEventListener('click', search);

// Manejar el evento de envío del formulario (opcional)
// Si deseas que se realice la búsqueda al presionar Enter dentro del campo de entrada
searchInput.addEventListener('keyup', function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    search();
  }
});







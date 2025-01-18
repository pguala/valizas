// Función para actualizar los precios de las habitaciones según la fecha actual
function actualizarPreciosHabitaciones() {
    // Obtener la fecha actual en formato YYYY-MM-DD
    const fechaActual = new Date().toISOString().split('T')[0];
  
    fetch('habitaciones.json')
      .then(response => response.json())
      .then(data => {
        // Recorrer todas las habitaciones y actualizar los precios según la fecha
        const habitaciones = document.querySelectorAll('.room-wrap');
        
        data.forEach((habitacionData, index) => {
          // Encontrar el elemento de precio dentro de cada habitación
          const elementoPrecio = habitaciones[index].querySelector('.price');
  
          // Encontrar el precio para la fecha actual
          const precioActual = habitacionData.precios.find(rangoPrecio => {
            return fechaActual >= rangoPrecio.fecha_inicio && fechaActual <= rangoPrecio.fecha_fin;
          });
  
          // Actualizar el precio en el elemento HTML
          if (precioActual) {
            elementoPrecio.innerHTML = `USD ${precioActual.precio}`;
          } else {
            elementoPrecio.innerHTML = 'Precio no disponible';
          }
        });
      })
      .catch(error => {
        console.error('Error al obtener los datos de las habitaciones:', error);
      });
  }
  
  // Llamar a la función para actualizar los precios al cargar la página
  document.addEventListener('DOMContentLoaded', actualizarPreciosHabitaciones);
  
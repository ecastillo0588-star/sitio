// main.js - scripts para funcionalidades adicionales
// Ejemplo: año dinámico en el footer, lógica de modales, etc.

export function setCurrentYear() {
  if (typeof window !== 'undefined') {
    const yearSpan = document.getElementById('year');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear().toString();
  }
}

// Puedes agregar aquí más funciones JS para el sitio

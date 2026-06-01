  class ControlReloj {
    /**
     * @param {string} idSufijo - El sufijo único del reloj (ej: 'presion' o 'velocidad')
     */
    constructor(idSufijo) {
      // Guardamos las referencias a los elementos del DOM una sola vez para mejorar el rendimiento
      this.nodoAguja = document.getElementById(`aguja-${idSufijo}`);
      this.nodoDigital = document.getElementById(`valor-digital-${idSufijo}`);
      
      if (!this.nodoAguja || !this.nodoDigital) {
        console.error(`No se encontraron los elementos para el reloj con identificador: ${idSufijo}`);
      }
    }

    /**
     * Actualiza los valores visuales del reloj
     * @param {number} porcentaje - Valor de la aguja de 0 a 100
     * @param {number|string} valorNumerico - Valor para el odómetro digital
     */
    actualizar_reloj(porcentaje, valorNumerico) {
      if (!this.nodoAguja || !this.nodoDigital) return;

      // 1. Forzar rango de 0 a 100
      const p = Math.max(0, Math.min(100, porcentaje));

      // 2. Calcular rotación física de la aguja (-120deg a 120deg)
      const grados = -120 + (p * 2.4);
      this.nodoAguja.setAttribute('transform', `rotate(${grados} 50 50)`);

      // 3. Formatear y pintar el número digital
      if (!isNaN(valorNumerico)) {
        this.nodoDigital.innerText = String(valorNumerico).padStart(4, '0');
      } else {
        this.nodoDigital.innerText = valorNumerico;
      }

      // 4. Cambiar el color del texto digital según la zona de la aguja
      if (p < 70) {
        this.nodoDigital.style.color = '#00ff00'; // Verde
      } else if (p >= 70 && p < 90) {
        this.nodoDigital.style.color = '#ffc107'; // Amarillo
      } else {
        this.nodoDigital.style.color = '#ff3b30'; // Rojo
      }
    }
  }
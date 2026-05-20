(function(global){

  const UISelectorDivs = {

    /**
     * Devuelve un array de divs a partir de un prefijo y un tamaño
     * @param {string} prefijo - nombre base del div (ej. "barra_proporcion_")
     * @param {number} cantidad - número de elementos
     * @param {number} inicio - número inicial del sufijo (ej. 1 → 01)
     * @returns {HTMLElement[]} array de divs
     */
	
    obtenerDivs(prefijo, cantidad, inicio = 1){

      const divs = [];

      for(let i = 0; i < cantidad; i++){

        const indice = inicio + i;
        const sufijo = String(indice).padStart(2, "0");

        const div = document.getElementById(`${prefijo}${sufijo}`);

        divs.push(div || null);

      }

      return divs;

    },

    obtenerDiv(id){
      const div = document.getElementById(id);

      return div || null;
    }

  };

  global.UISelectorDivs = UISelectorDivs;

})(window);
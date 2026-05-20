(function (global) {

  const UITotales = {

    inicializar() {

      const inputsCantidadSustratos = UISelectorDivs.obtenerDivs("cantidad_", 10);
      const inputsCantidadAgua = UISelectorDivs.obtenerDivs("cantidad_", 2, 11);
      const celdaTotal01 = document.getElementById("suma_sustratos");
      const celdaTotal02 = document.getElementById("celda_totales");

      function actualizarTotalSustratos() {

        let suma = 0;

        inputsCantidadSustratos.forEach(input => {

          if (input.disabled) return;

          const limpio = input.value.replace(/\D/g, '');
          const val = Number(limpio);

          if (Number.isFinite(val)) {
            suma += val;
          }

        });

        celdaTotal01.textContent = new Intl.NumberFormat('de-DE', {
          maximumFractionDigits: 0
        }).format(suma);

        inputsCantidadAgua.forEach(input => {

          if (input.disabled) return;

          const limpio = input.value.replace(/\D/g, '');
          const val = Number(limpio);

          if (Number.isFinite(val)) {
            suma += val;
          }

          celdaTotal02.textContent = new Intl.NumberFormat('de-DE', {
          maximumFractionDigits: 0
        }).format(suma);

        });
      }

      // Escuchar cambios
      inputsCantidadSustratos.forEach(input => {
        input.addEventListener("blur", actualizarTotalSustratos);
      });

      inputsCantidadAgua.forEach(input => {
        input.addEventListener("blur", actualizarTotalSustratos);
      });

      // Estado inicial
      actualizarTotalSustratos();

      // Exponer la función si otro módulo la necesita
      this.actualizar = actualizarTotalSustratos;
    }

  };

  global.UITotales = UITotales;

})(window);
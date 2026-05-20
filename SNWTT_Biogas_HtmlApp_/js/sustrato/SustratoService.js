(function (global) {

  const SustratoService = {

    obtenerSustratosSeleccionados() {

      const bd = window.BD_SUSTRATOS.sustratos;

      // Array fijo de 10 posiciones + 1 para recirculación (MS)
      const resultado = new Array(10).fill(null);

      const selects = document.querySelectorAll("select[id^='sustrato_']");

      selects.forEach(select => {

        const sufijo = select.id.replace("sustrato_", "");

        const index = Number(sufijo) - 1;

        if (index < 0 || index >= 10) return;

        const idSustrato = select.value;

        if (!idSustrato) {
          resultado[index] = null;
          return;
        }

        const cantidadInput = document.getElementById(`cantidad_${sufijo}`);

        const cantidad = cantidadInput
          ? Number(cantidadInput.value.replace(/\D/g, "")) || 0
          : 0;

        let dataEncontrada = null;

        for (const tipo of Object.values(bd)) {
          const encontrado = tipo.find(s => s._id === idSustrato);
          if (encontrado) {
            dataEncontrada = encontrado;
            break;
          }
        }

        if (!dataEncontrada) {
          resultado[index] = null;
          return;
        }

        resultado[index] = new Sustrato({
          cantidad: cantidad,
          pAgua: (1 - Number(dataEncontrada.MS)),
          pMO: Number(dataEncontrada.MO),
          pNO: Number(dataEncontrada.NO),
          pNH: Number(dataEncontrada.NH),
          pP: Number(dataEncontrada.P),
          pK: Number(dataEncontrada.K),
          rM: Number(dataEncontrada.RM),
          rend: Number(dataEncontrada.BG)
        });

      });
	
      return resultado;
    }

  };

  global.SustratoService = SustratoService;

})(window);
(function(global){

  const UIFormatter = {
    formatearNumero(arrayValores, decimales) {
      const valores = Array.isArray(arrayValores)
        ? arrayValores
        : [arrayValores];

      return valores.map(v => {

        if (v === null || v === undefined || isNaN(Number(v))) {
          return "0";
        }

        return new Intl.NumberFormat("de-DE", {
          minimumFractionDigits: decimales,
          maximumFractionDigits: decimales
        }).format(Number(v));

      });
    },

    formatearPorcentaje(arrayValores, decimales) {
      const valores = Array.isArray(arrayValores)
        ? arrayValores
        : [arrayValores];

      return valores.map(v => {
        if (v === null || v === undefined) return "0";
        return (Number(v) * 100).toFixed(decimales).replace(".", ",");
      });
    }

  };

  global.UIFormatter = UIFormatter;

})(window);
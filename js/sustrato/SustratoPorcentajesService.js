(function(global){

  const SustratoPorcentajesService = {

    calcularPorcentajesSustrato(array, premezcla, selector = s => s.getCantidad(), esDirecto = false){

      const total = selector(premezcla);

      return array.map(s => {

        if(total === 0 || s === null){
          return 0;
        }

        const valor = esDirecto ? s : selector(s);

        return valor / total;

      });

    },

    calcularPorcentajesBiometano(array){
      let total = 0;
      array.forEach(s => {

        if(!s) return;

        total += (s.getCantidad() * s.getRM() * s.getRend()) / 8400;

      });
      
      return array.map(s => {

        if(total === 0 || !s){
          return 0;
        }

        return (((s.getCantidad() * s.getRM() * s.getRend()) / 8400) / total);

      });
    },

    calcularPorcentajeMatSecSobreTotal(array){
      return array.map(s => {
        if(s === null){
          return 0;
        }

        const valor = (s.getMO() / s.getCantidad());
        return valor;

      });
    }

  };

  global.SustratoPorcentajesService = SustratoPorcentajesService;

})(window);
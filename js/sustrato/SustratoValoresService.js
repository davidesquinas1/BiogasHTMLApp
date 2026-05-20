(function(global){

  const SustratoValoresService = {


    obtenerValoresSustratos(array, selector = s => s.getCantidad(), esDirecto = false){

      return array.map(s => {

        if(s === null){
          return 0;
        }

        const valor = esDirecto ? s : selector(s);

        return valor;

      });

    },

    calcularValoresBiometano(arraySustratos){

      return arraySustratos.map(s => {
        if(s === null){
          return 0;
        }

        const valor = (s.getCantidad() * s.getRM() * s.getRend()) / 8400;
        return valor;

      });
    },

    calcularValoresBiometanoReformado(arraySustratos){

      return arraySustratos.map(s => {
        if(s === null){
          return 0;
        }

        const valor = s.getCantidad() * s.getRend() * s.getRM();
        return valor;

      });
    }

  };

  global.SustratoValoresService = SustratoValoresService;

})(window);
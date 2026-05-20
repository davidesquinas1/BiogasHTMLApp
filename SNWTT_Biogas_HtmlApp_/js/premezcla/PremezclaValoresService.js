(function(global){

  const PremezclaValoresService = {

    obtenerValorPremezcla(premezcla, selector = p => p.getCantidad()){
      if(!premezcla){
        return 0;
      }

      const valor = selector(premezcla);

      return isNaN(valor) ? 0 : valor;
    },

    calcularValorBiometano(premezcla){
      if(!premezcla){
        return 0;
      }

      const valor = (premezcla.getCantidad() * premezcla.getRM() * premezcla.getRend()) / 8400;
      return valor;
      
    },

    calcularValorBiometanoReformado(premezcla){
      if(!premezcla){
        return 0;
      }

      const valor = premezcla.getCantidad() * premezcla.getRend() * premezcla.getRM();
      return valor;

      
    }

  };

  global.PremezclaValoresService = PremezclaValoresService;

})(window);
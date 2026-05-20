(function(global){

  const MezclaValoresService = {

    obtenerValorMezcla(mezcla, selector = p => p.getCantidad()){
      if(!mezcla){
        return 0;
      }

      const valor = selector(mezcla);

      return isNaN(valor) ? 0 : valor;
    },

    calcularValorBiometano(mezcla){
      if(!mezcla){
        return 0;
      }

      const valor = (mezcla.getCantidad() * mezcla.getRM() * mezcla.getRend()) / 8400;
      return valor;
      
    },

    calcularValorBiometanoReformado(mezcla){
      if(!mezcla){
        return 0;
      }

      const valor = mezcla.getCantidad() * mezcla.getRend() * mezcla.getRM();
      return valor;

    },

    calcularProdEnergia(mezcla, pci, eficRef){
      if(!mezcla){
        return 0;
      }
	  
      biometanoReformado = this.calcularValorBiometanoReformado(mezcla);
      console.log(biometanoReformado);
      return ((biometanoReformado * pci) / 1000000) * (eficRef / 100);

    }

  };

  global.MezclaValoresService = MezclaValoresService;

})(window);
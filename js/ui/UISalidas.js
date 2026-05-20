(function(global){

  const UISalidas = {

    calcularDatosSalida(digestado, separado, selector = s => s.getCantidad()){

      const valorDigestado = selector(digestado);
      const valorSeparado = selector(separado);

      return {
        ancho: valorSeparado / valorDigestado,
        valor: valorSeparado
      };

    },

    calcularMSFraccionLiquida(separado){
      return separado.getMS() / separado.getCantidad();
    }

  };

  global.UISalidas = UISalidas;

})(window);
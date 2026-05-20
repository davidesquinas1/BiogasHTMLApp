(function(global){

  const UIConversionGlobalMO = {

    calcularConversionGlobalMO(biogas, mezcla){

      const cantidadBiogas = biogas.getBiogasCantidad();
      const mOMezcla = mezcla.getMO();

      return {
        ancho: cantidadBiogas / mOMezcla,
        valor: cantidadBiogas / mOMezcla
      };

    }

  };

  global.UIConversionGlobalMO = UIConversionGlobalMO;

})(window);
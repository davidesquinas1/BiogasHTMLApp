(function(global){

  const MezclaAguaService = {

    agregarAgua(mezcla, cantidadAgua, materia_seca, max_NO, max_NH4, max_P2O5, max_K2O){

      if(!mezcla) return mezcla;

      if(!cantidadAgua || cantidadAgua <= 0) return mezcla;
	  
	  if (materia_seca < 0 || materia_seca > 1) return mezcla;

      mezcla.agregarAgua(cantidadAgua, materia_seca, max_NO, max_NH4, max_P2O5, max_K2O);

      return mezcla;
    }

  };

  global.MezclaAguaService = MezclaAguaService;

})(window);
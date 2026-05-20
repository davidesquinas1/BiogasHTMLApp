(function (global) {

  const MezclaService = {

    calcularMezcla(arraySustratos) {

      const mezcla = new Mezcla();

      arraySustratos.forEach(sustrato => {

        if (sustrato === null) return;

        mezcla.agregarSustrato(sustrato);

      });

      return mezcla;
    }

  };

  global.MezclaService = MezclaService;

})(window);
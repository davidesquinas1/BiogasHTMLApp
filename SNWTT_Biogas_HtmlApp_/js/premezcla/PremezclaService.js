(function (global) {

  const PremezclaService = {

    calcularPremezcla(arraySustratos) {

      const premezcla = new Premezcla();

      arraySustratos.forEach(sustrato => {

        if (sustrato === null) return;

        premezcla.agregarSustrato(sustrato);

      });

      return premezcla;
    }

  };

  global.PremezclaService = PremezclaService;

})(window);
(function (global) {

  const UIFormatosCant = {

    inicializar() {

      const inputsCantidad = document.querySelectorAll("input[id^='cantidad_']");

      inputsCantidad.forEach(input => {

        new NumberFormatter(input, {
          type: 'cantidad',
          formatThousands: true,
          onChange: () => {
            input.dispatchEvent(new Event("formatted"));
          }
        });

        // FORMATEAR VALOR INICIAL
        input.dispatchEvent(new Event("blur"));

      });

    }

  };

  global.UIFormatosCant = UIFormatosCant;

})(window);
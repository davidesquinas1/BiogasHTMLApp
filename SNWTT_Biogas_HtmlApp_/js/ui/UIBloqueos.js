(function (global) {

  const UIBloqueos = {

    inicializar() {

      const selects = document.querySelectorAll("select[id^='sustrato_']");

      selects.forEach(select => {

        const sufijo = select.id.replace('sustrato_', '');
        const inputCantidad = document.getElementById(`cantidad_${sufijo}`);

        if (!inputCantidad) return;

        const bloqueador = new BloqueadorInput({
          controlador: select,
          targets: inputCantidad,
          condicionBloqueo: ctrl => ctrl.value === "",
          valorDefecto: "0"
        });

        bloqueador.inicializar();

      });

    }

  };

  global.UIBloqueos = UIBloqueos;

})(window);
(function (global) {

  const UIEventosMezcla = {

    inicializar(callbackActualizacion) {

      document.querySelectorAll("select[id^='sustrato_']")
        .forEach(el => el.addEventListener("change", callbackActualizacion));

      document.querySelectorAll("input[id^='cantidad_']")
        .forEach(el => el.addEventListener("blur", callbackActualizacion));

    }

  };

  global.UIEventosMezcla = UIEventosMezcla;

})(window);
(function(global){

  const UIValores = {

    mostrar(valores, divs){

      // Convertir a array si no lo es
      const valoresArray = Array.isArray(valores) ? valores : [valores];
      const divsArray = Array.isArray(divs) ? divs : [divs];

      valoresArray.forEach((v, i) => {

        const div = divsArray[i];

        if(!div) return;

        div.textContent = v;

      });

    }

  };

  global.UIValores = UIValores;

})(window);
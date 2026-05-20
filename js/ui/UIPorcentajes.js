(function(global){

  const UIPorcentajes = {

    mostrar(porcentajes, valores, divs){
      // convertir a arrays si no lo son
      porcentajes = Array.isArray(porcentajes)
        ? porcentajes
        : [porcentajes];

      valores = Array.isArray(valores)
        ? valores
        : [valores];

      divs = Array.isArray(divs)
        ? divs
        : [divs];
        
      porcentajes.forEach((p,i)=>{

        const div = divs[i];

        if(!div) return;

        const ancho = (p * 100).toFixed(1) + "%";

        div.style.width = ancho;
        div.textContent = valores[i];

      });

    }

  };

  global.UIPorcentajes = UIPorcentajes;

})(window);
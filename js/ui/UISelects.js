(function (global) {

  const UISelects = {

    inicializar(data) {
      const selects = document.querySelectorAll("select[id^='sustrato_']");

      selects.forEach(select => {

        select.innerHTML = "";

        const optVacia = document.createElement("option");
        optVacia.value = "";
        optVacia.textContent = "ninguno";
        select.appendChild(optVacia);

        Object.keys(data).forEach(nombreGrupo => {

          const optgroup = document.createElement("optgroup");
          optgroup.label = nombreGrupo.toUpperCase();

          data[nombreGrupo].forEach(s => {
            const option = document.createElement("option");
            option.value = s._id;
            option.textContent = s._id.toLowerCase();
            optgroup.appendChild(option);
          });

          select.appendChild(optgroup);
        });

        select.value = "";
      });
    }

  };

  global.UISelects = UISelects;

})(window);
(function (global) {

  async function guardarEstado() {

    const estado = {};

    document.querySelectorAll("input, select, textarea").forEach(el => {

      if (!el.id) return;

      estado[el.id] = {
        value: el.value ?? "",
        disabled: el.disabled ?? false,
        readonly: el.readOnly ?? false
      };

    });

    const contenido = JSON.stringify(estado, null, 2);

    // nombre sugerido
    let nombreArchivo = prompt(
      "Nombre del archivo:",
      "estado_mezcla.json"
    );

    if (!nombreArchivo) return;

    // asegurar extensión
    if (!nombreArchivo.endsWith(".json")) {
      nombreArchivo += ".json";
    }

    // =========================
    // SaveFilePicker
    // =========================
    if ("showSaveFilePicker" in window) {

      try {

        const handle = await window.showSaveFilePicker({
          suggestedName: nombreArchivo,
          types: [{
            description: "Archivo JSON",
            accept: {
              "application/json": [".json"]
            }
          }]
        });

        const writable = await handle.createWritable();

        await writable.write(contenido);

        await writable.close();

        console.log("Archivo guardado con File Picker");

        return;

      } catch (err) {

        // usuario canceló
        if (err.name === "AbortError") {
          return;
        }

        console.warn(
          "showSaveFilePicker falló, usando descarga clásica",
          err
        );
      }
    }

    // =========================
    // Metodo normal
    // =========================

    const blob = new Blob(
      [contenido],
      { type: "application/json" }
    );

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = nombreArchivo;

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);

    console.log("Archivo descargado con método clásico");
  }

  function cargarEstado(event) {

    const archivo = event.target.files[0];
    if (!archivo) return;

    const reader = new FileReader();

    reader.onload = function (e) {

      let estado;

      try {
        estado = JSON.parse(e.target.result);
      } catch (err) {
        console.error("JSON inválido", err);
        return;
      }

      Object.entries(estado).forEach(([id, data]) => {

        const el = document.getElementById(id);
        if (!el) return;

        // compatibilidad con versiones antiguas
        if (typeof data === "string") {
          el.value = data;
          return;
        }

        el.value = data.value ?? "";

        // restaurar estado de bloqueo
        if (typeof data.disabled === "boolean") {
          el.disabled = data.disabled;
        }

        if (typeof data.readonly === "boolean") {
          el.readOnly = data.readonly;
        }

      });

      // re-ejecutar lógica de la app
      if (global.actualizarEstadoApp) {
        global.actualizarEstadoApp();
      }

      if (global.UIBloqueos?.inicializar) {
        global.UIBloqueos.inicializar();
      }

      if (global.UITotales?.actualizar) {
        global.UITotales.actualizar();
      }

      const btnCalcular = document.getElementById("Boton_Calcular");

      if (btnCalcular) {
        btnCalcular.click();
      }

    };

    reader.readAsText(archivo);
  }

  global.guardarEstado = guardarEstado;
  global.cargarEstado = cargarEstado;

})(window);
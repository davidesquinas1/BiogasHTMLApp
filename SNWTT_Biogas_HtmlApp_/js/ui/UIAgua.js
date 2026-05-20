const UIAgua = {

  obtenerDilucion() {
    const input = document.getElementById("cantidad_11");
    return Number(input?.value.replace(/\D/g,'')) || 0;
  },

  obtenerRecirculacion() {
    const input = document.getElementById("cantidad_12");
    return Number(input?.value.replace(/\D/g,'')) || 0;
  }

}

window.UIAgua = UIAgua;
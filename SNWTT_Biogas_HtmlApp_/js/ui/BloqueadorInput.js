class BloqueadorInput {
  constructor({ controlador, targets, condicionBloqueo, valorDefecto }) {
    this.controlador = controlador;
    this.targets = Array.isArray(targets) ? targets : [targets];
    this.condicionBloqueo = condicionBloqueo;
    this.valorDefecto = valorDefecto;
  }

  inicializar() {
    // Estado inicial
    this.actualizar();

    // Escuchar cambios
    this.controlador.addEventListener("change", () => this.actualizar());
    this.controlador.addEventListener("input", () => this.actualizar());
  }

  actualizar() {
    const bloqueado = this.condicionBloqueo(this.controlador);

    this.targets.forEach(target => {
      target.disabled = bloqueado;
      target.classList.toggle("disabled", bloqueado);

      if (bloqueado) {
        target.value = this.valorDefecto;
      }
    });
  }
}

window.BloqueadorInput = BloqueadorInput;

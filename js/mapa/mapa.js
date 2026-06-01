//Para colocación sobre el mapa
function obtenerDigitosPorEje(idTextbox, eje) {
  
    const valor = document.getElementById(idTextbox).value.trim().padStart(4, '0').slice(0, 4);
	
	const tramoTexto = (eje === 'x' ? valor.slice(0, 2) : valor.slice(2, 4));
    const numero = parseInt(tramoTexto, 10) || 0;
    const numeroSeguro = Math.min(Math.max(10, numero), 90);
    return numeroSeguro + '%';
}

window.obtenerPorcentajePorEje = obtenerPorcentajePorEje;
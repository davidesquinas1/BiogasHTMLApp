//Para colocación sobre el mapa control posición
function obtenerDigitosPorEje(idTextbox, eje) {
  
    const valor = document.getElementById(idTextbox).value.trim().padStart(4, '0').slice(0, 4);
	
	const tramoTexto = (eje === 'x' ? valor.slice(0, 2) : valor.slice(2, 4));
    const numero = parseInt(tramoTexto, 10) || 0;
    const numeroSeguro = Math.min(Math.max(10, numero), 90);
    return numeroSeguro + '%';
}

//arrastra y suelta

const contenedor = document.getElementById('contenedor-mapa');
const marcador = document.getElementById('marcador-mapa');

let arrastrando = false;

const iniciarArrastre = (e) => {
    arrastrando = true;
    marcador.style.cursor = 'grabbing';
    e.preventDefault(); 
};

const finalizarArrastre = () => {
    arrastrando = false;
    marcador.style.cursor = 'grab';
};

const mover = (e) => {
    
	if (!arrastrando) return;
	
    const rect = contenedor.getBoundingClientRect();
    
    const clienteX = e.touches ? e.touches[0].clientX : e.clientX;
    const clienteY = e.touches ? e.touches[0].clientY : e.clientY;

    let x = clienteX - rect.left;
    let y = clienteY - rect.top;

    if (x < 0) x = 0;
    if (x > rect.width) x = rect.width;
    if (y < 0) y = 0;
    if (y > rect.height) y = rect.height;

    const xPorcentaje = (x / rect.width) * 100;
    const yPorcentaje = (y / rect.height) * 100;

    marcador.style.left = `${xPorcentaje}%`;
    marcador.style.top = `${yPorcentaje}%`;
	
	//meter el valor en el input para su almacenamiento
	const inputUbicacion = document.getElementById('ubicacion');
	
    if (inputUbicacion) {
        // Redondear a entero y asegurar 2 dígitos (ej: 5 -> "05", 50 -> "50")
        const xx = Math.round(xPorcentaje).toString().padStart(2, '0');
        const yy = Math.round(yPorcentaje).toString().padStart(2, '0');
        
        // Unir ambos valores en una cadena de 4 dígitos
        inputUbicacion.value = `${xx}${yy}`;
    }

};

marcador.addEventListener('mousedown', iniciarArrastre);

window.addEventListener('mouseup', finalizarArrastre);
window.addEventListener('mousemove', mover);

// táctiles (móviles y tabletas)
marcador.addEventListener('touchstart', iniciarArrastre, { passive: false });
window.addEventListener('touchend', finalizarArrastre);
window.addEventListener('touchmove', mover, { passive: false });


function alternarVisibilidad() {
    
	var panel = document.getElementById('panel_resumen');
    var boton = document.getElementById('btn_ocultar_resumen');
	
    var esIngles = document.documentElement.lang.toLowerCase().startsWith('en');

    if (panel.style.display === 'none') {
        panel.style.display = 'block'; 
        boton.innerText = esIngles ? 'Hide Panel' : 'Ocultar Panel';
    } else {
        panel.style.display = 'none'; 
        boton.innerText = esIngles ? 'View Panel' : 'Ver Panel';
    }
}
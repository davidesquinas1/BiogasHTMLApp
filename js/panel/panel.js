function alternarVisibilidad() {
    var panel = document.getElementById('panel_resumen');
    var boton = document.getElementById('btn_ocultar_resumen');

    if (panel.style.display === 'none') {

        panel.style.display = 'block'; 
        boton.innerText = 'Ocultar Panel';
    } else {
        panel.style.display = 'none'; 
        boton.innerText = 'Ver Panel';
    }
}
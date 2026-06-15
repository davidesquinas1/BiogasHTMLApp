document.addEventListener("DOMContentLoaded", () => {

  console.log("App iniciada.");

  UISelects.inicializar(window.BD_SUSTRATOS.sustratos);
  
  UIFormatosCant.inicializar();
  
  UITotales.inicializar();
  
  UIBloqueos.inicializar();
  
  UIEventosMezcla.inicializar(actualizarEstadoApp);
 
  actualizarEstadoApp();

  // botones
  const btnCalcular = document.getElementById("Boton_Calcular");

  document
    .getElementById("btn_guardar")
    .addEventListener("click", window.guardarEstado);

  document
    .getElementById("btn_cargar")
    .addEventListener("click", () => {
      document.getElementById("input_cargar").click();
    });

  document
    .getElementById("input_cargar")
    .addEventListener("change", window.cargarEstado);
 
  //actualizar el mapa
  const campoCoordenadas = document.getElementById('ubicacion');

  if (campoCoordenadas) {

    campoCoordenadas.addEventListener('input', () => {
		const posX = window.obtenerDigitosPorEje('ubicacion', 'x');
		const posY = window.obtenerDigitosPorEje('ubicacion', 'y');
        const marcador = document.getElementById('marcador-mapa');
        
		if (marcador) {
            marcador.style.left = posX;
            marcador.style.top = posY;
        }
		
		console.log("nueva x,y: ", posX, posY);
		
  })} 
  
  // ejecutar el cálculo
  if (btnCalcular) {

    btnCalcular.addEventListener("click", () => {

      const arraySustratos = SustratoService.obtenerSustratosSeleccionados();

      let premezcla = PremezclaService.calcularPremezcla(arraySustratos);

      let mezcla = MezclaService.calcularMezcla(arraySustratos);

	  const dil = UIAgua.obtenerDilucion();
	  const rec = UIAgua.obtenerRecirculacion();

	  //agregar la dilución limpia
      mezcla = MezclaAguaService.agregarAgua(mezcla, dil, 0, 0, 0, 0, 0);

	  // agregar el agua de dilución sucia, la recirculación
	  const msmaxrec = parseFloat(document.getElementById('ms_max_recirculacion')?.value.replace(',','.')) / 100;
	  const pmax_NO = parseFloat(document.getElementById('max_NO')?.value.replace(',','.')) / 100;
	  const pmax_NH4 = parseFloat(document.getElementById('max_NH4')?.value.replace(',','.')) / 100;
	  const pmax_P2O5 = parseFloat(document.getElementById('max_P2O5')?.value.replace(',','.')) / 100;
	  const pmax_K2O = parseFloat(document.getElementById('max_K2O')?.value.replace(',','.')) / 100;
	
      mezcla = MezclaAguaService.agregarAgua(mezcla, rec, msmaxrec, pmax_NO, pmax_NH4, pmax_P2O5, pmax_K2O);
	  
      /* 
      ========================================
      Actualizar porcentajes de cantidad sobre subtotal
      ========================================
      */

      // calcular porcentajes de cantidad sobre subtotal
      let arrayPorcentajes = SustratoPorcentajesService.calcularPorcentajesSustrato(arraySustratos, premezcla, s => s.getCantidad());

      // crear textos a mostrar
      let arrayValoresTexto = UIFormatter.formatearPorcentaje(arrayPorcentajes, 1)

      // obtener divs de barras
      let arrayDivs = UISelectorDivs.obtenerDivs("barra_proporcion_", arrayPorcentajes.length, 1);

      // actualizar UI
      UIPorcentajes.mostrar(
        arrayPorcentajes,
        arrayValoresTexto,
        arrayDivs
      );

      /* 
      ====================
      Premezcla
      ====================
      */
     let valorPremezcla = 100;

     let premezclaDiv = UISelectorDivs.obtenerDiv("proporcion_premezcla");

     UIValores.mostrar(
        valorPremezcla,
        premezclaDiv
      );

      /* 
      ========================================
      Actualizar cantidad de nitrogeno total sobre subtotal
      ========================================
      */

      // calcular porcentajes de cantidad de nitrogeno total sobre subtotal
      arrayPorcentajes = SustratoPorcentajesService.calcularPorcentajesSustrato(arraySustratos, premezcla, s => s.getNT());

      // crear textos a mostrar
      arrayValoresTexto = UIFormatter.formatearNumero(SustratoValoresService.obtenerValoresSustratos(arraySustratos, s => s.getNT()), 0);

      // obtener divs de barras
      arrayDivs = UISelectorDivs.obtenerDivs("barra_nitrogeno_", arrayPorcentajes.length, 1);

      // actualizar UI
      UIPorcentajes.mostrar(
        arrayPorcentajes,
        arrayValoresTexto,
        arrayDivs
      );

      /* 
      ====================
      Premezcla
      ====================
      */
      valorPremezcla = UIFormatter.formatearNumero(PremezclaValoresService.obtenerValorPremezcla(premezcla, p => p.getNT()), 0);

      premezclaDiv = UISelectorDivs.obtenerDiv("nitrogeno_premezcla");

      UIValores.mostrar(
          valorPremezcla,
          premezclaDiv
      );

      /* 
      ====================
      Mezcla
      ====================
      */
      let valorMezcla = UIFormatter.formatearNumero(MezclaValoresService.obtenerValorMezcla(mezcla, m => m.getNT()), 0);

      let mezclaDiv = UISelectorDivs.obtenerDiv("nitrogeno_total");

      UIValores.mostrar(
          valorMezcla,
          mezclaDiv
      );
    

      /* 
      ========================================
      Actualizar cantidad de biometano sobre subtotal
      ========================================
      */

      // calcular porcentajes de cantidad de biometano sobre subtotal
      arrayPorcentajes = SustratoPorcentajesService.calcularPorcentajesBiometano(arraySustratos, premezcla);

      // crear textos a mostrar
      arrayValoresTexto = UIFormatter.formatearNumero(SustratoValoresService.calcularValoresBiometano(arraySustratos), 0);

      // obtener divs de barras
      arrayDivs = UISelectorDivs.obtenerDivs("barra_biometano_", arrayPorcentajes.length, 1);

      // actualizar UI
      UIPorcentajes.mostrar(
        arrayPorcentajes,
        arrayValoresTexto,
        arrayDivs
      );

      /* 
      ====================
      Premezcla
      ====================
      */
     valorPremezcla = UIFormatter.formatearNumero(PremezclaValoresService.calcularValorBiometano(premezcla), 0);

     premezclaDiv = UISelectorDivs.obtenerDiv("biometano_premezcla");

     UIValores.mostrar(
        valorPremezcla,
        premezclaDiv
      );

      /* 
      ========================================
      Actualizar cantidad de materia seca sobre subtotal
      ========================================
      */
      // crear textos a mostrar
      arrayValoresTexto = UIFormatter.formatearPorcentaje(SustratoValoresService.obtenerValoresSustratos(arraySustratos, s => s.getPMS()), 2);
        

      // obtener divs
      arrayDivs = UISelectorDivs.obtenerDivs("materia_seca_", arrayValoresTexto.length, 1);

      // actualizar UI
      UIValores.mostrar(
        arrayValoresTexto,
        arrayDivs
      );

      /* 
      ====================
      Premezcla
      ====================
      */
      valorPremezcla = UIFormatter.formatearPorcentaje(PremezclaValoresService.obtenerValorPremezcla(premezcla, p => p.getPMS()), 2);

      premezclaDiv = UISelectorDivs.obtenerDiv("materia_seca_premezcla");

      UIValores.mostrar(
          valorPremezcla,
          premezclaDiv
      );

      /* 
      ====================
      Mezcla
      ====================
      */
      valorMezcla = UIFormatter.formatearPorcentaje(MezclaValoresService.obtenerValorMezcla(mezcla, m => m.getPMS()), 2);

      mezclaDiv = UISelectorDivs.obtenerDiv("materia_seca_total");

      UIValores.mostrar(
          valorMezcla,
          mezclaDiv
      );
      

      /* 
      ========================================
      Actualizar cantidad de materia organica sobre subtotal
      ========================================
      */
      // crear textos a mostrar
      arrayValoresTexto = UIFormatter.formatearPorcentaje(SustratoValoresService.obtenerValoresSustratos(arraySustratos, s => s.getpMOR()), 2);
     
      // obtener divs
      arrayDivs = UISelectorDivs.obtenerDivs("materia_organica_", arrayValoresTexto.length, 1);

      // actualizar UI
      UIValores.mostrar(
        arrayValoresTexto,
        arrayDivs
      );

      /* 
      ====================
      Premezcla
      ====================
      */
     valorPremezcla = UIFormatter.formatearPorcentaje(PremezclaValoresService.obtenerValorPremezcla(premezcla, p => p.getpMOR()), 2);

     premezclaDiv = UISelectorDivs.obtenerDiv("materia_organica_premezcla");

     UIValores.mostrar(
        valorPremezcla,
        premezclaDiv
      );

      /* 
      ====================
      Mezcla
      ====================
      */
      valorMezcla = UIFormatter.formatearPorcentaje(MezclaValoresService.obtenerValorMezcla(mezcla, m => m.getpMOR()), 2);

      mezclaDiv = UISelectorDivs.obtenerDiv("materia_organica_total");

      UIValores.mostrar(
          valorMezcla,
          mezclaDiv
      );


      /* 
      ========================================
      Actualizar cantidad de materia organica sobre materia seca
      ========================================
      */
      // crear textos a mostrar
      arrayValoresTexto = UIFormatter.formatearPorcentaje(SustratoValoresService.obtenerValoresSustratos(arraySustratos, s => s.getPMO()), 2);
      
      // obtener divs
      arrayDivs = UISelectorDivs.obtenerDivs("materia_organica_sobre_seca_", arrayValoresTexto.length, 1);

      // actualizar UI
      UIValores.mostrar(
        arrayValoresTexto,
        arrayDivs
      );

      /* 
      ====================
      Premezcla
      ====================
      */
      valorPremezcla = UIFormatter.formatearPorcentaje(PremezclaValoresService.obtenerValorPremezcla(premezcla, p => p.getPMO()), 2);

      premezclaDiv = UISelectorDivs.obtenerDiv("materia_organica_sobre_seca");

      UIValores.mostrar(
          valorPremezcla,
          premezclaDiv
      );

      /* 
      ====================
      Mezcla
      ====================
      */
      valorMezcla = UIFormatter.formatearPorcentaje(MezclaValoresService.obtenerValorMezcla(mezcla, m => m.getPMO()), 2);

      mezclaDiv = UISelectorDivs.obtenerDiv("materia_organica_sobre_seca_total");

      UIValores.mostrar(
          valorMezcla,
          mezclaDiv
      );

      /* 
      ========================================
      Actualizar riqueza en metano
      ========================================
      */
      // crear textos a mostrar
      arrayValoresTexto = UIFormatter.formatearPorcentaje(SustratoValoresService.obtenerValoresSustratos(arraySustratos, s => s.getRM()), 2);
      
      // obtener divs
      arrayDivs = UISelectorDivs.obtenerDivs("riqueza_", arrayValoresTexto.length, 1);

      // actualizar UI
      UIValores.mostrar(
        arrayValoresTexto,
        arrayDivs
      );

      /* 
      ====================
      Premezcla
      ====================
      */
      valorPremezcla = UIFormatter.formatearPorcentaje(PremezclaValoresService.obtenerValorPremezcla(premezcla, p => p.getRM()), 2);

      premezclaDiv = UISelectorDivs.obtenerDiv("riqueza_premezcla");

      UIValores.mostrar(
          valorPremezcla,
          premezclaDiv
      );

      /* 
      ====================
      Mezcla
      ====================
      */
      valorMezcla = UIFormatter.formatearPorcentaje(MezclaValoresService.obtenerValorMezcla(mezcla, m => m.getRM()), 2);

      mezclaDiv = UISelectorDivs.obtenerDiv("riqueza_total");

      UIValores.mostrar(
          valorMezcla,
          mezclaDiv
      );

      /* 
      ========================================
      Actualizar produccion biogas
      ========================================
      */
      arrayValoresTexto = UIFormatter.formatearNumero(SustratoValoresService.obtenerValoresSustratos(arraySustratos, s => s.getRend()), 2);

      // obtener divs
      arrayDivs = UISelectorDivs.obtenerDivs("produccion_biogas_", arrayValoresTexto.length, 1);

      // actualizar UI
      UIValores.mostrar(
        arrayValoresTexto,
        arrayDivs
      );

      /* 
      ====================
      Premezcla
      ====================
      */
      valorPremezcla = UIFormatter.formatearNumero(PremezclaValoresService.obtenerValorPremezcla(premezcla, p => p.getRend()), 2);

      premezclaDiv = UISelectorDivs.obtenerDiv("produccion_biogas_premezcla");

      UIValores.mostrar(
          valorPremezcla,
          premezclaDiv
      );

      /* 
      ====================
      Mezcla
      ====================
      */
      valorMezcla = UIFormatter.formatearNumero(MezclaValoresService.obtenerValorMezcla(mezcla, m => m.getRend()), 2);

      mezclaDiv = UISelectorDivs.obtenerDiv("produccion_biogas_total");

      UIValores.mostrar(
          valorMezcla,
          mezclaDiv
      );

      /* 
      ========================================
      Actualizar biometano reformado
      ========================================
      */
      arrayValoresTexto = UIFormatter.formatearNumero(SustratoValoresService.calcularValoresBiometanoReformado(arraySustratos), 0);

      // obtener divs
      arrayDivs = UISelectorDivs.obtenerDivs("biometano_reformado_", arrayValoresTexto.length, 1);

      // actualizar UI
      UIValores.mostrar(
        arrayValoresTexto,
        arrayDivs
      );
      
      /* 
      ====================
      Premezcla
      ====================
      */
      valorPremezcla = UIFormatter.formatearNumero(PremezclaValoresService.calcularValorBiometanoReformado(premezcla), 0);

      premezclaDiv = UISelectorDivs.obtenerDiv("biometano_reformado_premezcla");

      UIValores.mostrar(
          valorPremezcla,
          premezclaDiv
      );

      /* 
      ====================
      Mezcla
      ====================
      */
      const pciDiv = UISelectorDivs.obtenerDiv("pci");
      let pci = pciDiv ? pciDiv.textContent : "0";

      const eficRefDiv = UISelectorDivs.obtenerDiv("eficiencia_reformado");

      let eficRef = 0;

      if (eficRefDiv && eficRefDiv.value) {
        eficRef = Number(
          eficRefDiv.value
            .trim()
            .replace(",", ".")
        );

        if (isNaN(eficRef)) eficRef = 0;
      }

      pci = Number(pci.replace(/\./g, "").replace(",", "."));

      valorMezcla = UIFormatter.formatearNumero(MezclaValoresService.calcularProdEnergia(mezcla, pci, eficRef), 2);

      mezclaDiv = UISelectorDivs.obtenerDiv("valor_celda_energia");

      UIValores.mostrar(
          valorMezcla,
          mezclaDiv
      );

      /* 
      ====================
      Biogas
      ====================
      */
      const energia = MezclaValoresService.calcularProdEnergia(mezcla, pci, eficRef);
      const factorReformado = eficRef / 100;

      const biogas = new Biogas(mezcla, factorReformado, energia);

      console.log("===== BIOGAS =====");
      biogas.imprimirBiogas();

      let gasesEscape = UIFormatter.formatearNumero(biogas.getGasEscape(), 0);
      let gasesEscapeDiv = UISelectorDivs.obtenerDiv("gases_rechazo");

      UIValores.mostrar(
          gasesEscape,
          gasesEscapeDiv
      );

      let biometanoReformado = UIFormatter.formatearNumero(biogas.getMetanoCantidad() * factorReformado, 0);
      let biometanoReformadoDiv = UISelectorDivs.obtenerDiv("biometano_reformado");

      UIValores.mostrar(
          biometanoReformado,
          biometanoReformadoDiv
      );
      
      // calcular datos separado
      let conversionGlobalMO = UIConversionGlobalMO.calcularConversionGlobalMO(biogas, mezcla);

      // obtener div
      let conversionGlobalMODiv = UISelectorDivs.obtenerDiv("barra_conversion_mo");

      // actualizar UI
      UIPorcentajes.mostrar(
        conversionGlobalMO.ancho,
        UIFormatter.formatearPorcentaje(conversionGlobalMO.valor) + "%",
        conversionGlobalMODiv
      );

      /* 
      ====================
      Mezcla actualizar biometano_total
      ====================
      */
      valorMezcla = UIFormatter.formatearNumero(biogas.getMetanoCaudalH(), 0);

      mezclaDiv = UISelectorDivs.obtenerDiv("biometano_total");

      UIValores.mostrar(
          valorMezcla,
          mezclaDiv
      );

      /* 
      ====================
      Digestado
      ====================
      */
      let digestado = new Digestado(mezcla, biogas);
      console.log("===== DIGESTADO =====");
      digestado.imprimirDigestado();

      let mSSalidaDigestado = UIFormatter.formatearPorcentaje(digestado.getPorMSSalida(), 2);
      let mSSalidaDigestadoDiv = UISelectorDivs.obtenerDiv("ms_salida_digestado");

      UIValores.mostrar(
          mSSalidaDigestado,
          mSSalidaDigestadoDiv
      );

      let mSSalidaDigestadoDiv02 = UISelectorDivs.obtenerDiv("ms_digestor_secundario_02");

      UIValores.mostrar(
          mSSalidaDigestado,
          mSSalidaDigestadoDiv02
      );

      let nHDigestado = UIFormatter.formatearNumero(digestado.getConcentracionNH4(), 0);
      let nHDigestadoDiv = UISelectorDivs.obtenerDiv("nitrogeno_amoniacal_digestado");

      UIValores.mostrar(
          nHDigestado,
          nHDigestadoDiv
      );

      let nODigestado = UIFormatter.formatearNumero(digestado.getConcentracionNO3(), 0);
      let nODigestadoDiv = UISelectorDivs.obtenerDiv("nitrogeno_organico_digestado");

      UIValores.mostrar(
          nODigestado,
          nODigestadoDiv
      );

      let pDigestado = UIFormatter.formatearNumero(digestado.getConcentracionP(), 0);
      let pDigestadoDiv = UISelectorDivs.obtenerDiv("fosforo_digestado");

      UIValores.mostrar(
          pDigestado,
          pDigestadoDiv
      );

      let kDigestado = UIFormatter.formatearNumero(digestado.getConcentracionK(), 0);
      let kDigestadoDiv = UISelectorDivs.obtenerDiv("potasio_digestado");

      UIValores.mostrar(
          kDigestado,
          kDigestadoDiv
      );
	  
	  // quitar la recirculación!!
      let cantidadDigestado = UIFormatter.formatearNumero(digestado.getCantidad() - rec, 0);
      let cantidadDigestadoDiv = UISelectorDivs.obtenerDiv("cantidad_digestado");

      UIValores.mostrar(
          cantidadDigestado,
          cantidadDigestadoDiv
      );

	  // máx N en digestado
	  let cmaxN_Digestado = UIFormatter.formatearNumero(((digestado.getNO() + digestado.getNH()) / digestado.getCantidad()) * 100, 2);
      let cmaxN_DigestadoDiv = UISelectorDivs.obtenerDiv("cN_Digestado");
	  
      UIValores.mostrar(
          cmaxN_Digestado,
          cmaxN_DigestadoDiv
      );

      /* 
      ====================
      Separacion
      ====================
      */
      const rendSLDiv = UISelectorDivs.obtenerDiv("rendimiento_separador");

      let rendSL = 0;

      if (rendSLDiv && rendSLDiv.value) {
        rendSL = Number(
          rendSLDiv.value
            .trim()
            .replace(",", ".")
        );

        if (isNaN(rendSL)) rendSL = 0;
      }

      const fraccionSolidaDiv = UISelectorDivs.obtenerDiv("ms_fraccion_solida");

      let fraccionSolida = 0;

      if (fraccionSolidaDiv && fraccionSolidaDiv.value) {
        fraccionSolida = Number(
          fraccionSolidaDiv.value
            .trim()
            .replace(",", ".")
        );

        if (isNaN(fraccionSolida)) fraccionSolida = 0;
      }

      rendSL = rendSL / 100;
      fraccionSolida = fraccionSolida / 100;

      let separacion = new Separacion(digestado, rendSL, fraccionSolida);
      let separadoSolido = separacion.getSeparadoSolido();
      let separadoLiquido = separacion.getSeparadoLiquido();

      console.log("===== SEPARADO SOLIDO =====");
      separadoSolido.imprimirSeparado();

      console.log("===== SEPARADO LIQUIDO =====");
      separadoLiquido.imprimirSeparado();


      /* 
      ====================
      Digestores
      ====================
      */
      const digPrimarioDiv = UISelectorDivs.obtenerDiv("digestores_primarios");
      const diamPrimarioDiv = UISelectorDivs.obtenerDiv("dimension_digestores_01");

      const digSecundarioDiv = UISelectorDivs.obtenerDiv("digestores_secundarios");
      const diamSecundarioDiv = UISelectorDivs.obtenerDiv("dimension_digestores_02");

      const alturaDiv = UISelectorDivs.obtenerDiv("dimension_digestores_03");

      const conversionMOPrimarioDDiv = UISelectorDivs.obtenerDiv("conversion_mo_primario");

      let digPrimario = 0;
	  
      if (digPrimarioDiv && digPrimarioDiv.value) {
        digPrimario = Number(
          digPrimarioDiv.value
            .trim()
        );

        if (isNaN(digPrimario)) digPrimario = 0;
      }

      let diamPrimario = 0;
	  
      if (diamPrimarioDiv && diamPrimarioDiv.value) {
        diamPrimario = Number(
          diamPrimarioDiv.value
            .trim()
            .replace(",", ".")
        );

        if (isNaN(diamPrimario)) diamPrimario = 0;
      }


      let digSecundario = 0;
	  
      if (digSecundarioDiv && digSecundarioDiv.value) {
        digSecundario = Number(
          digSecundarioDiv.value
            .trim()
        );

        if (isNaN(digSecundario)) digSecundario = 0;
      }

      let diamSecundario = 0;
	  
      if (diamSecundarioDiv && diamSecundarioDiv.value) {
        diamSecundario = Number(
          diamSecundarioDiv.value
            .trim()
            .replace(",", ".")
        );

        if (isNaN(diamSecundario)) diamSecundario = 0;
      }

      let altura = 0;
	  
      if (alturaDiv && alturaDiv.value) {
        altura = Number(
          alturaDiv.value
            .trim()
            .replace(",", ".")
        );

        if (isNaN(altura)) altura = 0;
      }

      let conversionMOPrimario = 0;
	  
      if (conversionMOPrimarioDDiv && conversionMOPrimarioDDiv.value) {
        conversionMOPrimario = Number(
          conversionMOPrimarioDDiv.value
            .trim()
            .replace(",", ".")
        );

        if (isNaN(conversionMOPrimario)) conversionMOPrimario = 0;
      }

      let digestores = new Digestores(mezcla, biogas, digPrimario, diamPrimario, digSecundario, diamSecundario, altura, conversionMOPrimario / 100);

      console.log("===== DIGESTORES =====");
      digestores.imprimirDigestores();

      let tiempoResidencia = UIFormatter.formatearNumero(digestores.getTiempoRetencion(), 2);
      let tiempoResidenciaDiv = UISelectorDivs.obtenerDiv("tiempo_residencia");

      UIValores.mostrar(
          tiempoResidencia,
          tiempoResidenciaDiv
      );

      let mSDigestorPrimario = UIFormatter.formatearPorcentaje(digestores.getMSDigestorPrimario(), 2);
      let mSDigestorPrimarioDiv = UISelectorDivs.obtenerDiv("ms_digestor_primario");

      UIValores.mostrar(
          mSDigestorPrimario,
          mSDigestorPrimarioDiv
      );

      let mSDigestorPrimarioDiv02 = UISelectorDivs.obtenerDiv("ms_digestor_primario_02");

      UIValores.mostrar(
          mSDigestorPrimario,
          mSDigestorPrimarioDiv02
      );

      let cargaOrganica = UIFormatter.formatearNumero(digestores.getCargaOrganica(), 2);
      let cargaOrganicaDiv = UISelectorDivs.obtenerDiv("carga_organica");

      UIValores.mostrar(
          cargaOrganica,
          cargaOrganicaDiv
      );

      let inhibicionAmoniacal = UIFormatter.formatearPorcentaje(digestores.getInhibicionAmoniacal(), 2);
      let inhibicionAmoniacalDiv = UISelectorDivs.obtenerDiv("inhibicion_amoniacal");

      UIValores.mostrar(
          inhibicionAmoniacal,
          inhibicionAmoniacalDiv
      );

      let volumenTotalDigestores = UIFormatter.formatearNumero(digestores.getVolumenTotal(), 0);
      let volumenTotalDigestoresDiv = UISelectorDivs.obtenerDiv("volumen_total_digestores");

      UIValores.mostrar(
          volumenTotalDigestores,
          volumenTotalDigestoresDiv
      );

      /* 
      ========================================
      Actualizar salida DIGESTADO
      ========================================
      */
      /* 
      ====================
      Cantidad
      ====================
      */
      // calcular datos separado
      let datosSolido = UISalidas.calcularDatosSalida(digestado, separadoSolido, s => s.getCantidad());

      // obtener div
      let salidaSolidoDiv = UISelectorDivs.obtenerDiv("barra_digestado_solido");

      // actualizar UI
      UIPorcentajes.mostrar(
        datosSolido.ancho,
        UIFormatter.formatearNumero(datosSolido.valor, 0),
        salidaSolidoDiv
      );

      // calcular datos separado (quitar la recirculación!!)
      let datosLiquido = UISalidas.calcularDatosSalida(digestado, separadoLiquido, s => s.getCantidad() - rec);

      // obtener div
      let salidaLiquidoDiv = UISelectorDivs.obtenerDiv("barra_digestado_liquido");

      // actualizar UI
      UIPorcentajes.mostrar(
        datosLiquido.ancho,
        UIFormatter.formatearNumero(datosLiquido.valor, 0),
        salidaLiquidoDiv
      );

      /* 
      ====================
      Nitrogeno
      ====================
      */
      // calcular datos separado
      let datosNitrogenoSolido = UISalidas.calcularDatosSalida(digestado, separadoSolido, s => s.getNT());

      // obtener div
      let salidaNitrogenoSolidoDiv = UISelectorDivs.obtenerDiv("barra_nitrogeno_12");

      // actualizar UI
      UIPorcentajes.mostrar(
        datosNitrogenoSolido.ancho,
        UIFormatter.formatearNumero(datosNitrogenoSolido.valor, 0),
        salidaNitrogenoSolidoDiv
      );

      // calcular datos separado
      let datosNitrogenoLiquido = UISalidas.calcularDatosSalida(digestado, separadoLiquido, s => s.getNT());

      // obtener div
      let salidaNitrogenoLiquidoDiv = UISelectorDivs.obtenerDiv("barra_nitrogeno_13");

      // actualizar UI
      UIPorcentajes.mostrar(
        datosNitrogenoLiquido.ancho,
        UIFormatter.formatearNumero(datosNitrogenoLiquido.valor, 0),
        salidaNitrogenoLiquidoDiv
      );

      /* 
      ====================
      MS fraccion liquida
      ====================
      */
      // calcular dato
      let mSFraccionLiquida = UISalidas.calcularMSFraccionLiquida(separadoLiquido);

      // obtener div
      let mSFraccionLiquidaDiv = UISelectorDivs.obtenerDiv("ms_fraccion_liquida");

      // actualizar UI
      UIValores.mostrar(
          UIFormatter.formatearPorcentaje(mSFraccionLiquida, 2),
          mSFraccionLiquidaDiv
      );

	/* actualizar el resumen */
	
	/* relojes del resumen */

  const LIMITE_ROJO = 0.75;
	
	// MS máximo será 10%
	let m_valor = parseFloat(document.getElementById('ms_digestor_primario_02').innerText.replace(',', '.').trim());
	console.log("Reloj 1: ", m_valor);
	let p_valor = Math.min(1, m_valor / 13.333333333333333) * 105; // correccion por color
    new ControlReloj('reloj_1').actualizar_reloj(p_valor, m_valor);
    
	// Tiempo de residencia mínimo serán 40 días (es inverso) 
	m_valor = parseFloat(document.getElementById('tiempo_residencia').innerText.replace(',', '.').trim());
	console.log("Reloj 2: ", m_valor);
	p_valor = (Math.max(0, (80 - m_valor)) / 80) * 100;
    new ControlReloj('reloj_2').actualizar_reloj(p_valor, m_valor);
	
	// Carga orgánica, máximo 4
	m_valor = parseFloat(document.getElementById('carga_organica').innerText.replace(',', '.').trim());
	console.log("Reloj 3: ", m_valor);
	p_valor = Math.min(1, m_valor / 5.333333333333333) * 105; // correccion por color
    new ControlReloj('reloj_3').actualizar_reloj(p_valor, m_valor);	
	
	// In. amoniacal, máximo 5%
	m_valor = parseFloat(document.getElementById('inhibicion_amoniacal').innerText.replace(',', '.').trim());
	console.log("Reloj 4: ", m_valor);
	p_valor = Math.min(1, m_valor / 6.666666666666667) * 105; // correccion por color
    new ControlReloj('reloj_4').actualizar_reloj(p_valor, m_valor);	
	
	// indicadores resumen
	
	document.getElementById('energia_total').innerText = document.getElementById('valor_celda_energia').innerText
	document.getElementById('capacidad_tratamiento').innerText = document.getElementById('suma_sustratos').innerText

	m_valor = Number(document.getElementById('digestores_primarios').value) + Number(document.getElementById('digestores_secundarios').value);
	console.log("digestores totales: ", m_valor);
	document.getElementById('numero_digestores_total').innerText = m_valor;
	
	// Mapa
	
	const m_mx = window.obtenerDigitosPorEje('ubicacion', 'x');
	const m_my = window.obtenerDigitosPorEje('ubicacion', 'y');
	
	console.log("ubicación x: ", m_mx);
	console.log("ubicación y: ", m_my);
	
	document.getElementById('marcador-mapa').style.left = m_mx;
	document.getElementById('marcador-mapa').style.top = m_my;
	
	});

  }

  });

  function actualizarEstadoApp() {

    /* 
    ========================================
    Actualizar array sustratos
    ========================================
    */
    const arraySustratos = SustratoService.obtenerSustratosSeleccionados();

    /* 
    ========================================
    Imprimir sustratos
    ========================================
    */
    console.log("===== TEST ARRAY SUSTRATOS =====");
    console.log(arraySustratos);

    arraySustratos.forEach((sustrato, index) => {

      console.log(`Posición ${index + 1}:`);

      if (sustrato === null) {
          console.log("→ null");
      } else {
          sustrato.imprimirSustrato();
      }

    });

    /* 
    ========================================
    Calcular premezcla
    ========================================
    */
    let premezcla = PremezclaService.calcularPremezcla(arraySustratos);

    /* 
    ========================================
    Calcular mezcla
    ========================================
    */
	
    let mezcla = MezclaService.calcularMezcla(arraySustratos);
	
	const dil = UIAgua.obtenerDilucion();
	const rec = UIAgua.obtenerRecirculacion();
	
	//agregar la dilución limpia
    mezcla = MezclaAguaService.agregarAgua(mezcla, dil, 0, 0, 0, 0, 0);
	
	// agregar el agua de dilución sucia, la recirculación
	const msmaxrec = parseFloat(document.getElementById('ms_max_recirculacion')?.value.replace(',','.')) / 100;
	const pmax_NO = parseFloat(document.getElementById('max_NO')?.value.replace(',','.')) / 100;
	const pmax_NH4 = parseFloat(document.getElementById('max_NH4')?.value.replace(',','.')) / 100;
	const pmax_P2O5 = parseFloat(document.getElementById('max_P2O5')?.value.replace(',','.')) / 100;
	const pmax_K2O = parseFloat(document.getElementById('max_K2O')?.value.replace(',','.')) / 100;
	
    mezcla = MezclaAguaService.agregarAgua(mezcla, rec, msmaxrec, pmax_NO, pmax_NH4, pmax_P2O5, pmax_K2O);

    /* 
    ========================================
    Imprimir premezcla
    ========================================
    */

    console.log("===== PREMEZCLA RESULTANTE =====");

    premezcla.imprimirSustrato();

    /* 
    ========================================
    Imprimir Mezcla
    ========================================
    */

    console.log("===== MEZCLA RESULTANTE =====");

    mezcla.imprimirSustrato();

    /* 
    ========================================
    Actualizar Total
    ========================================
    */

    UITotales.actualizar();

  }

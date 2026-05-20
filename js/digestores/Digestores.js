class Digestores {

    constructor(mezcla, biogas, digestoresPrimario, diamPrimario, digestoresSecundario, diamSecundario, h, ratioCVPrimario) {
        this.ratioCVPrimario = ratioCVPrimario;
        this.ratioCVSecundario = 1 - ratioCVPrimario;

        this.mSEntrada = mezcla.getMS() / mezcla.getCantidad();
        this.rendGasificacionTotal = biogas.getBiogasCantidad() / mezcla.getMS();
        this.rendimientoGasificacionPrimario = this.rendGasificacionTotal * this.ratioCVPrimario;

        this.volumenPrimario = (digestoresPrimario * h * diamPrimario * diamPrimario * Math.PI) / 4;
        this.volumenSecundario = (digestoresSecundario * h * diamSecundario * diamSecundario * Math.PI) / 4;

        this.volumenTotal = this.volumenPrimario + this.volumenSecundario;

        this.caudalNominal = mezcla.getCantidad() / 365;
        this.mSDigestorPrimario = this.mSEntrada * ((1 - this.rendimientoGasificacionPrimario) / (1 - this.rendimientoGasificacionPrimario * this.mSEntrada)); 
        this.tiempoRetencion = this.volumenTotal / this.caudalNominal;
        this.cargaOrganica = (mezcla.getMO() * 1000 / 365) / this.volumenPrimario;
        this.inhibicionAmoniacal = mezcla.getNH() / ((mezcla.getMO() + mezcla.getMOResto()) / 2);
        
    }

    getMSEntrada() {return this.mSEntrada;}

    getRendGasificacionTotal() {return this.rendGasificacionTotal;}

    getRendGasificacionPrimario() {return this.rendimientoGasificacionPrimario;}

    getVolumenPrimario() {return this.volumenPrimario;}

    getVolumenSecundario() {return this.volumenSecundario;}

    getVolumenTotal() {return this.volumenTotal;}

    getCaudalNominal() {return this.caudalNominal;}

    getMSDigestorPrimario() {return this.mSDigestorPrimario;}

    getTiempoRetencion() {return this.tiempoRetencion;}

    getCargaOrganica() {return this.cargaOrganica;}

    getInhibicionAmoniacal() {return this.inhibicionAmoniacal;}

    imprimirDigestores() {
        console.log(`
            mSEntrada :${this.getMSEntrada()}, 
            rendGasificacionTotal :${this.getRendGasificacionTotal()},  
            rendGasificacionPrimario :${this.getRendGasificacionPrimario()},
            volumenPrimario :${this.getVolumenPrimario()},
            volumenSecundario :${this.getVolumenSecundario()},
            volumenTotal :${this.getVolumenTotal()},
            caudalNominal :${this.getCaudalNominal()},
            mSDigestorPrimario :${this.getMSDigestorPrimario()},
            tiempoRetencion :${this.getTiempoRetencion()},
            cargaOrganica :${this.getCargaOrganica()},
            inhibicionAmoniacal :${this.getInhibicionAmoniacal()}`);
    }

}

window.Digestores = Digestores;
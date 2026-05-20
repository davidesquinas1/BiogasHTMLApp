class Separacion {
    constructor(digestado, rendSL, fraccionSolida) {
        this.digestado = digestado;
        this.rendSL = rendSL;
        this.fraccionSolida = fraccionSolida;
        
    }

    getSeparadoSolido() {
        // calculos para crear la clase
        let cantidad = this.digestado.getCantidad() * this.rendSL;
        let agua = cantidad * (1 - this.fraccionSolida);
        let mS = cantidad * this.fraccionSolida;
        let nO = this.digestado.getNO() * this.rendSL;
        let nH = (agua * 1000 * this.digestado.getConcentracionNH4()) / 1000000000;
        let p = this.digestado.getP() * this.rendSL;
        let k = this.digestado.getK() * this.rendSL;

        return new Separado(cantidad, agua, mS, nO, nH, p, k);

    }

    getSeparadoLiquido() {
        let cantidadSolido = this.digestado.getCantidad() * this.rendSL;
        let aguaSolido = cantidadSolido * (1 - this.fraccionSolida);
        let mSSolido = cantidadSolido * this.fraccionSolida;
        let nOSolido = this.digestado.getNO() * this.rendSL;
        let nHSolido = (aguaSolido * 1000 * this.digestado.getConcentracionNH4()) / 1000000000;
        let pSolido = this.digestado.getP() * this.rendSL;
        let kSolido = this.digestado.getK() * this.rendSL;

        let cantidadLiquido = this.digestado.getCantidad() - cantidadSolido;
        let aguaLiquido = this.digestado.getAgua() - aguaSolido;
        let mSLiquido = this.digestado.getMS() - mSSolido;
        let nOLiquido = this.digestado.getNO() - nOSolido;
        let nHLiquido = this.digestado.getNH() - nHSolido;
        let pLiquido = this.digestado.getP() - pSolido;
        let kLiquido = this.digestado.getK() - kSolido;

        return new Separado(cantidadLiquido, aguaLiquido, mSLiquido, nOLiquido, nHLiquido, pLiquido, kLiquido);
    }

}

window.Separacion = Separacion;
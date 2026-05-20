class Premezcla extends window.Sustrato {
    constructor() {
        super({
            cantidad: 0,
            pAgua: 0,
            pMO: 0,
            pNO: 0,
            pNH: 0,
            pP: 0,
            pK: 0,
            rM: 0,
            rend: 0,
            prod: 0
        });
    }

    agregarSustrato(sustrato) {
        if (sustrato.getCantidad() === 0){return}

        if(this.cantidad === 0){
            this.cantidad = sustrato.getCantidad();
            this.Agua = sustrato.getAgua();
            this.mO = sustrato.getMO();
            this.mS = sustrato.getMS();
            this.nO = sustrato.getNO();
            this.nH = sustrato.getNH();
            this.p = sustrato.getP();
            this.k = sustrato.getK();
            this.mOR = sustrato.getpMOR();
            this.rM = sustrato.getRM();
            this.rend = sustrato.getRend();
            this.prod = sustrato.getProd();
            this.mOResto = sustrato.getMOResto();

            return;
        }

        let copPremezcla = this.clone();
        let cantidadTotal = copPremezcla.getCantidad() + sustrato.getCantidad()
        
        this.cantidad = cantidadTotal;
        this.Agua = copPremezcla.getAgua() + sustrato.getAgua();
        this.mO = copPremezcla.getMO() + sustrato.getMO();
        this.mS = copPremezcla.getMS() + sustrato.getMS();
        this.nO = copPremezcla.getNO() + sustrato.getNO();
        this.nH = copPremezcla.getNH() + sustrato.getNH();
        this.p = copPremezcla.getP() + sustrato.getP();
        this.k = copPremezcla.getK() + sustrato.getK();
        this.mOR = ((copPremezcla.getpMOR() * copPremezcla.getCantidad()) + (sustrato.getpMOR() * sustrato.getCantidad())) / cantidadTotal;
        this.rend = ((copPremezcla.getRend() * copPremezcla.getCantidad()) + (sustrato.getRend() * sustrato.getCantidad())) / cantidadTotal;
        this.prod = ((copPremezcla.getProd() * copPremezcla.getCantidad()) + (sustrato.getProd() * sustrato.getCantidad())) / cantidadTotal;
        this.rM = (this.prod / Sustrato.DENSIDADCH4) / this.rend;
        this.mOResto = this.mS - this.nO - this.nH - this.p - this.k;
        
    }

    reset() {
        this.cantidad = 0;
        this.Agua = 0;
        this.mO = 0;
        this.mS = 0;
        this.nO = 0;
        this.nH = 0;
        this.p = 0;
        this.k = 0;
        this.mOR = 0;
        this.rM = 0;
        this.rend = 0;
        this.prod = 0;
        this.mOResto = 0;
    }
}

window.Premezcla = Premezcla;
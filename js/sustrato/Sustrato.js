class Sustrato {
    static DENSIDADCH4 = 0.717;

    constructor({cantidad, pAgua, pMO, pNO, pNH, pP, pK, rM, rend}) {
        // VALORES
        this.cantidad = cantidad;   // cantidad en la mezcla
        this.rend = rend;           // Nm3 biogás/L, rendimiento metano
        this.rM = rM;               // riqueza metano sobre biogas
        this.prod = rend * rM * Sustrato.DENSIDADCH4;

        //CÁLCULOS A PARTIR DE PROPORCIONES
        this.Agua = cantidad * pAgua;                                               // agua
        this.mS = cantidad - this.Agua;                                             // materia seca
        this.mO = this.mS * pMO;                                                    // masa orgánica / masa sólida
        this.nO = cantidad * pNO;                                                   // nitrogeno organico
        this.nH = cantidad * pNH;                                                   // nitrogeno amoniacal
        this.p = cantidad * pP;                                                     // penoxido de fosforo
        this.k = cantidad * pK;                                                     // oxido de potasio
        this.mOResto = this.mS - this.nO - this.nH - this.p - this.k;               // materia organica resto 
    }

    // METODO ROUND
    _round(num){return Math.round(num * 100000) / 100000;}
    
    // GETTERS
    getCantidad(){return this.cantidad;}

    getAgua(){return this.Agua;}

    getNO(){return this.nO;} 

    getNH(){return this.nH;} 

    getP(){return this.p;} 

    getK(){return this.k;} 

    getRM(){return this.rM;}

    getRend(){return this.rend;}

    getMS(){return this.mS;}

    getMO(){return this.mO;}

    getNT(){return this.nO + this.nH;}

    getpMOR(){return (this.getMS() - this.getP() - this.getK() - this.getNT()) / this.cantidad;}

    getpAgua() {return this.cantidad === 0 ? 0 : this.Agua / this.cantidad;}

    getPMO() {return this.mS === 0 ? 0 : this.mO / this.mS;}

    getPMS() {return this.cantidad === 0 ? 0 : this.mS / this.cantidad;}

    getPNO() {return this.cantidad === 0 ? 0 : this.nO / this.cantidad;}

    getPNH() {return this.cantidad === 0 ? 0 : this.nH / this.cantidad;}

    getPP() {return this.cantidad === 0 ? 0 : this.p / this.cantidad;}

    getPK() {return this.cantidad === 0 ? 0 : this.k / this.cantidad;}

    getProd(){return this.prod;}

    getMOResto(){return this.mOResto;}

    // CLONE
    clone() {
        return new Sustrato({
            cantidad: this.cantidad,
            pAgua: this.getpAgua(),
            pMO: this.getPMO(),
            pNO: this.getPNO(),
            pNH: this.getPNH(),
            pP: this.getPP(),
            pK: this.getPK(),
            rM: this.rM,
            rend: this.rend
        });
    }
    
    // TESTING
    imprimirSustrato() {
        console.log(`
                    Cantidad :${this.getCantidad()}, 
                    Agua :${this.getAgua()},  
                    nO :${this.getNO()}, 
                    nH :${this.getNH()}, 
                    p :${this.getP()}, 
                    k :${this.getK()}, 
                    RM :${this.getRM()}, 
                    Rend :${this.getRend()}, 
                    mS :${this.getMS()}, 
                    mO :${this.getMO()},
                    mOResto :${this.getMOResto()},  
                    NT :${this.getNT()},
                    pMOR :${this.getpMOR()},
                    pMO :${this.getPMO()},
                    pMS :${this.getPMS()},
                    pAgua :${this.getpAgua()},
                    pNO :${this.getPNO()},
                    pNH :${this.getPNH()},
                    pP :${this.getPP()},
                    pK :${this.getPK()},
                    prod :${this.prod}`);
    }
}

window.Sustrato = Sustrato;
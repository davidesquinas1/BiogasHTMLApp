class Separado {
    constructor(cantidad, agua, mS, nO, nH, p, k) {
        this.cantidad = cantidad;
        this.agua = agua;
        
        this.mS = mS;
        this.nO = nO;
        this.nH = nH;
        this.nT = nO + nH;
        this.p = p;
        this.k = k;
        
    }

    getCantidad() {return this.cantidad;}

    getAgua() {return this.agua;}

    getMS() {return this.mS;}

    getNO() {return this.nO;}

    getNH() {return this.nH;}

    getNT() {return this.nT;}

    getP() {return this.p;}

    getK() {return this.k;}

    imprimirSeparado() {
        console.log(`
                    Cantidad :${this.getCantidad()}, 
                    Agua :${this.getAgua()},  
                    MS :${this.getMS()},
                    NO :${this.getNO()},
                    NH :${this.getNH()},
                    NT :${this.getNT()},
                    P :${this.getP()},
                    K :${this.getK()}`);
    }

}

window.Separado = Separado;
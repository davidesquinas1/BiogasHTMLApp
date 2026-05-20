class Digestado {
    constructor(mezcla, biogas) {
        if (!mezcla) throw new Error("Mezcla requerida");
        if (!biogas) throw new Error("Biogas requerido");

        // valores derivados
        this.rM = mezcla.getRM();
        this.rend = mezcla.getRend();
        this.prod = mezcla.getProd();

        this.agua = mezcla.getAgua();
        this.mS = mezcla.getMS() - biogas.getBiogasCantidad();
        this.mO = mezcla.getMOResto() - biogas.getBiogasCantidad();
        this.nO = mezcla.getNO() * 0.5;
        this.nH = mezcla.getNH() + (mezcla.getNO() * 0.5); // Xavier Flotats (orientativo 50%)
        this.p = mezcla.getP();
        this.k = mezcla.getK();

        this.cantidad = mezcla.getAgua() + this.nO + this.nH + this.p + this.k + this.mO;

        // valores nuevos
        this.concentracionNH4 = (this.nH * 1000000) / mezcla.getAgua();
        this.concentracionNO3 = (this.nO * 1000000) / mezcla.getAgua();
        this.concentracionP = (this.p * 1000000) / mezcla.getAgua();
        this.concentracionK = (this.k * 1000000) / mezcla.getAgua();
    }

    getCantidad(){return this.cantidad;}

    getAgua(){return this.agua;}

    getMS(){return this.mS;}

    getMO(){return this.mO;}

    getNO(){return this.nO;}

    getNH(){return this.nH;}

    getNT(){return this.nO + this.nH;}

    getP(){return this.p;}

    getK(){return this.k;}

    getConcentracionNH4(){return this.concentracionNH4;}

    getConcentracionNO3(){return this.concentracionNO3;}

    getConcentracionP(){return this.concentracionP;}

    getConcentracionK(){return this.concentracionK;}

    getPorMSSalida(){return this.getMS() / this.getCantidad();}

    // TESTING

    imprimirDigestado() {
        console.log(`
            Cantidad :${this.getCantidad()}, 
            Agua :${this.getAgua()},
            MS :${this.getMS()}, 
            MO :${this.getMO()},   
            NO :${this.getNO()}, 
            NH :${this.getNH()}, 
            P :${this.getP()}, 
            K :${this.getK()},  
            ConcNH :${this.getConcentracionNH4()},
            ConcNO3 :${this.getConcentracionNO3()},
            ConcP :${this.getConcentracionP()},
            ConcK :${this.getConcentracionK()}`);
                
    }

}

window.Digestado = Digestado;
class Mezcla extends window.Premezcla {

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

	// se permite agregar agua "sucia", utilizar 0.00 en MS y sales para agua de dilución limpia
    agregarAgua(cantidad, materia_seca, max_NO, max_NH4, max_P2O5, max_K2O){
        let agua = new Sustrato ({
            cantidad: cantidad,
            pAgua: 1 - materia_seca,
            pMO: 0,
            pNO: max_NO,
            pNH: max_NH4,
            pP: max_P2O5,
            pK: max_K2O,
            rM: 0,
            rend:0
        })

        this.agregarSustrato(agua);
    }

}

window.Mezcla = Mezcla;
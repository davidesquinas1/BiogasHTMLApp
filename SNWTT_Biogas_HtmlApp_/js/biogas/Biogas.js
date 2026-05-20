class Biogas {
  static DENSIDADCH4 = 0.717;

  constructor(premezcla, factorReformado, energia){

    // BIOGAS - se correlaciona la densidad para el rango
    this.biogasCantidad = (premezcla.getRend() * premezcla.getCantidad() * (-0.01247 * premezcla.getRM() * 100 + 1.94643)) / 1000;
    this.biogasVolumen = (premezcla.getRend() * premezcla.getCantidad()) / 1000000;
    this.biogasCaudalH = (this.biogasVolumen * 1000000) / 8400;
    this.biogasSVConv = premezcla.getMO() === 0 ? 0 : this.biogasCantidad / premezcla.getMO();

    // METANO
    this.metanoCantidad = (premezcla.getProd() * premezcla.getCantidad()) / 1000;
    this.metanoVolumen = ((this.metanoCantidad * 1000) / Biogas.DENSIDADCH4) / 1000000;
    this.metanoFactorReformado = factorReformado;
    this.metanoCaudalH = (((this.metanoCantidad * 1000) / Biogas.DENSIDADCH4)) * factorReformado / 8400;
    this.metanoEnergia = energia;

    // GAS ESCAPE
    this.gasEscape = this.biogasCantidad - (this.metanoCantidad * this.metanoFactorReformado);
  }

  getBiogasCantidad(){return this.biogasCantidad;}
  getBiogasVolumen(){return this.biogasVolumen;}
  getBiogasCaudalH(){return this.biogasCaudalH;}
  getBiogasSVConv(){return this.biogasSVConv;}

  getMetanoCantidad(){return this.metanoCantidad;}
  getMetanoVolumen(){return this.metanoVolumen;}
  getMetanoFactorReformado(){return this.metanoFactorReformado;}
  getMetanoCaudalH(){return this.metanoCaudalH;}
  getMetanoEnergia(){return this.metanoEnergia;}

  getGasEscape(){return this.gasEscape;}

  imprimirBiogas() {
    console.log(`
      Biogas cantidad: ${this.biogasCantidad}
      Biogas volumen: ${this.biogasVolumen}
      Biogas caudal H: ${this.biogasCaudalH}
      Biogas SV conv: ${this.biogasSVConv}
      Metano cantidad: ${this.metanoCantidad}
      Metano volumen: ${this.metanoVolumen}
      Metano factor reformado: ${this.metanoFactorReformado}
      Metano caudal H: ${this.metanoCaudalH}
      Metano energia: ${this.metanoEnergia}
      Gas escape: ${this.gasEscape}
    `);
  }
}

window.Biogas = Biogas;
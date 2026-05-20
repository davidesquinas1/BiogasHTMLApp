class NumberFormatter {
  constructor(input, options = {}) {
    this.input = input;
    this.type = options.type ?? "general"; // 'cantidad', 'dimension', 'degradacion'
    this.min = options.min ?? -Infinity;
    this.max = options.max ?? Infinity;
    this.decimals = options.decimals ?? 0;
    this.formatThousands = options.formatThousands ?? false;
    this.separator = options.separator ?? ',';
    this.onChange = options.onChange; // callback opcional
    this.formatter = new Intl.NumberFormat('de-DE', { maximumFractionDigits: this.decimals });
    this.bindEvents();
  }

  bindEvents() {
    this.input.addEventListener('blur', () => this.format());
  }

  format() {
    if (this.input.disabled) {
      return;
    }
    
    let val = this.input.value;

    if (this.type === 'cantidad') {
      let num = Number(val.replace(/\D/g, ''));
      if (!Number.isFinite(num)) num = 0;
      this.input.value = this.formatter.format(num);
      if (this.onChange) this.onChange(num); // actualizar sumatoria
    }
    else if (this.type === 'dimension') {
      let num = parseFloat(val.replace(',', '.'));
      if (!isFinite(num) || num < this.min || num > this.max) num = this.min ?? 0;
      this.input.value = num.toFixed(this.decimals).replace('.', this.separator);
      if (this.onChange) this.onChange(num);
    }
    else if (this.type === 'degradacion') {
      let num = parseFloat(val);
      if (!isFinite(num) || num < this.min || num > this.max) num = this.max ?? 100;
      this.input.value = num;
      if (this.onChange) this.onChange(num);
    }
  }
};

window.NumberFormatter = NumberFormatter;

class Debounce {
  constructor(fn, delay) {
    this.fn = fn;
    this.delay = delay;
    this.lastTimer = null;
  }

  debFunc = (...args) => {
    clearTimeout(this.lastTimer);

    this.lastTimer = setTimeout(() => {
      this.fn(...args);
    }, this.delay);
  };

  willUnmount() {
    this.clearTimer();
  }
}

export default Debounce;

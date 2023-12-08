/* eslint-disable class-methods-use-this */

class ConnectionCheck {
  didMount(on, off) {
    window.addEventListener('online', () => this.#handleOnline(on));
    // prettier-ignore
    window.addEventListener('offline', () => this.#handleOffline(off));
  }

  willUnmount() {
    window.removeEventListener('online', this.#handleOnline);
    window.removeEventListener('offline', this.#handleOffline);
  }

  #handleOnline = (on) => {
    on();
  };

  #handleOffline = (off) => {
    off();
  };
}

export default ConnectionCheck;

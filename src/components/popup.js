export class Popup {
  constructor(popup) {
    this._popup = popup;
  };

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => this._handleEscClose(evt));
  };

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => this._handleEscClose(evt));
  };

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  };

  setEventListeners() {
    this._popup.querySelector('.btn_type_close')
    .addEventListener('click', () => this.close());
    this._popup.addEventListener('click', (evt) => {
      if (evt.target === this._popup) {
        this.close();
      };
    });
  };
};
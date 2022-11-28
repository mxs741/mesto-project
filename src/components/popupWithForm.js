import {Popup} from "./popup.js";

export class PopupWithForm extends Popup {
  constructor(popup) {
    super(popup);
    this._form = this._popup.querySelector('form');
  }

  _getInputValues() {
    //собрать данные всех полей формы
    this._inputValues = this._form.elements;
  }

  close() {
    super.close()
    this._form.reset()
  }

  setEventListeners(submitCallback) {    
    this._submitCallback = submitCallback;
    super.setEventListeners()
    this._popup.addEventListener('submit', this._submitCallback)
  }
}
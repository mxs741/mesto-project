import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup) {
    super(popup);
    this._form = this._popup.querySelector('form');
    this._submitBtn = this._popup.querySelector('.form__btn');
  }

  _getInputValues() {
    //собрать данные всех полей формы
    this._inputValues = this._form.elements;
  }

  close() {
    super.close()
    this._form.reset()
    this._submitBtn.disabled = true;
    this._submitBtn.classList.add('form__btn_inactive');
  }

  setEventListeners(submitCallback) {
    this._submitCallback = submitCallback;
    super.setEventListeners()
    this._popup.addEventListener('submit', this._submitCallback)
  }
}
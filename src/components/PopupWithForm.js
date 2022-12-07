import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, submitCallback) {
    super(popup);
    this._form = this._popup.querySelector('form');
    this._submitBtn = this._popup.querySelector('.form__btn');
    this._submitBtnText = this._submitBtn.textContent
    this._inputList = this._form.querySelectorAll('.form__input');
    this._submitCallback = submitCallback;
  }

  //собрать данные всех полей формы
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  renderLoading(isLoading, loadingText = 'Сохранение...') {
    isLoading ?
    this._submitBtn.textContent = loadingText :
    this._submitBtn.textContent = this._submitBtnText
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', (evt) => {
      this._submitCallback(evt, this._getInputValues());
    });
  };
};
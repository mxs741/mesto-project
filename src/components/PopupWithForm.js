import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, submitCallback) {
    super(popup);
    this._form = this._popup.querySelector('form');
    this._submitBtn = this._popup.querySelector('.form__btn');
    this._submitCallback = submitCallback; //здесь нужно использовать this._getInputValues() ?!
  }

  //собрать данные всех полей формы
  _getInputValues() {
    this._inputList = this._form.querySelectorAll('.form__input');
    this._formValues = {};
    this._inputList.forEach(input => {
      // console.log(input.value)
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._submitCallback);
    // this._popup.addEventListener('submit', (evt) => {
    //   this._submitCallback(evt, this._getInputValues())
    // });
  }
}
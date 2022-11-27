import {Popup} from "./popup.js";

export class PopupWithForm extends Popup {
  constructor(popup, submitCallback) {
    super(popup)
    this._submitCallback = submitCallback
    this._form = this._popup.querySelector('form')
  }

  // _getInputValues() {
  //   //собрать данные всех полей формы
  //   this._inputValues = this._form.elements
  // }

  close() {
    super.close()
    this._form.reset()
  }

  setEventListeners() {
    super.setEventListeners()
    this._popup.addEventListener('submit', this._submitCallback)
  }
}
//Для каждого попапа создавайте свой экземпляр класса PopupWithForm
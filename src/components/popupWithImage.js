import {Popup} from "./popup.js";

export class PopupWithImage extends Popup {
  constructor(popup, popupCaption, popupImg) {
    super(popup)
    this._popupCaption = popupCaption
    this._popupImg = popupImg
  }

  open(name, link) {
    super.open()
    this._popupCaption.textContent = name;
    this._popupImg.alt = name;
    this._popupImg.src = link;
  }
}
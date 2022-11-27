export class Section {
  constructor ({renderer}, containerSelector) {    
    this._container = document.querySelector(containerSelector);
  }

  addItem (item) {
    this._container.prepend(item);
  }
}
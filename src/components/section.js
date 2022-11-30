export class Section {
  constructor (containerSelector) { //{items, renderer} - первый параметр
    this._container = document.querySelector(containerSelector);
    //this._renderer = renderer;
  }

  addItem (item) {
    this._container.prepend(item);
  }

  // отрисовка массива карточек(в промисе)
  // renderItems (items) {
  //   items.forEach(element => {

  //   });
  // }
}
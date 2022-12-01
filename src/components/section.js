export class Section {
  constructor ({items, renderer}, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
    this._items = items;
  }

  // Добавление карточки на страницу
  addItem (item) {
    this._container.prepend(item);
  }

  // Отрисовка массива карточек(в промисе)
  renderItems () {
    this._items.reverse().forEach(element => {
      this._renderer(element)
    });
  }
}
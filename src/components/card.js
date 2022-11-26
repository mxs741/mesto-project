import {api} from './api.js';
import {elements, popupImg} from './variables.js';

export class Card {
  constructor(data, myId, cardTemplate) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._likesLength = data.likes.length;
    this._ownerId = data.owner._id;
    this._myId = myId;
    this._tempCard = cardTemplate.querySelector('.element').cloneNode(true);
    this._tempElemTitle = this._tempCard.querySelector('.element__title');
    this._tempElemImg = this._tempCard.querySelector('.element__img');
    this._tempLikeBtn = this._tempCard.querySelector('.btn_type_like');
    this._tempDeleteBtn = this._tempCard.querySelector('.btn_type_remove-card');
    this._tempLikes = this._tempCard.querySelector('.element__number-of-likes');
   // this._cardElem = this._tempDeleteBtn.closest('.element'); // если я правильно поняла, это тот эл-т что вставляем на стр -> переименовала с tempCardElem
  }

  // отрисовка карточки на странице
  renderCard(container, inAfter) {
    inAfter ? container.append(this._tempCard) : container.prepend(this._tempCard);
  }

  // Проверить наличие класса active у кнопки
  _isLiked() {
    return this._tempLikeBtn.classList.contains('btn_type_like-active');
  };

  _setLike(res) {
    this._tempLikes.textContent = res.likes.length; //проверить что кол-во лайков берется из response
  };

  // Проверить наличие лайка от пользователя и изменить цвет кнопки this._likes
  _checkAndAddLikeIcon() {
    if(this._checkLike()) {
      this._tempLikeBtn.classList.add('btn_type_like-active');
    } else {
      this._tempLikeBtn.classList.remove('btn_type_like-active');
    }
  };

  // Проверить наличие лайка от пользователя
  _checkLike() {
    return this._likes.some((item) => {
      return item._id === this._myId;
    });
  };

  // Обработчик кнопки лайка
  _likesHandler() {
    (this._isLiked() ? api.putAwayLike(this._id) : api.putLike(this._id))
    .then(data => {
      this._setLike(data);
      this._tempLikeBtn.classList.toggle('btn_type_like-active');
    })
    .catch(err => console.log(err))
  };

  // Обработчик кнопки удаления карточки
  _delCardBtnHandler() {
    api.removeCard(this._id)
      .then(() => {
        this._tempCard.remove();
      })
      .catch(err => console.log(err))
};

  createCard(data) {
    this._tempElemTitle.textContent = this._name;
    this._tempElemImg.src = this._link;
    this._tempElemImg.alt = this._name;
    this._checkAndAddLikeIcon();

    if (this._likesLength) {
      this._tempLikes.textContent = this._likesLength;
    } else {
      this._tempLikes.textContent = '0';
    }

    this._tempLikeBtn.addEventListener('click', () => {
      this._likesHandler();
    });

    this._tempDeleteBtn.addEventListener('click', () => {
      this._delCardBtnHandler();
    });

    // Открытие попапа
    this._tempElemImg.addEventListener('click', () => {
      popupImg.open(this._name, this._link);
    });
    popupImg.setEventListeners()

    // Сравнить ID пользователя с ID создателя карточки для отображения иконки удаления
    if (this._myId !== this._ownerId) {
      this._tempDeleteBtn.style.display = 'none';
    };

    return this._tempCard;
  }

  // Добавление карточки на страницу
  addCard(data) {
    this.createCard(data);
    this.renderCard(elements, false);
  };
}

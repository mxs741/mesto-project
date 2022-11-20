import api from './api.js';

export class Card {
  constructor(data, myId, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likes = data.likes;
    this._likesLength = data.likes.length;
    this._ownerId = data.owner._id;
    this._myId = myId;
    this._tempCard = templateSelector.querySelector('.element').cloneNode(true);
    this._tempElemTitle = this._tempCard.querySelector('.element__title');
    this._tempElemImg = this._tempCard.querySelector('.element__img');
    this._tempLikeBtn = this._tempCard.querySelector('.btn_type_like');
    this._tempDeleteBtn = this._tempCard.querySelector('.btn_type_remove-card');
    this._tempLikes = this._tempCard.querySelector('.element__number-of-likes');
    this._cardElem = this._tempDeleteBtn.closest('.element'); // если я правильно поняла, это тот эл-т что вставляем на стр -> переименовала с tempCardElem
  }

  // отрисовка карточки на странице
  renderCard(container, inAfter) {
    inAfter ? container.append(this._cardElem) : container.prepend(this._cardElem);
  }

  // Проверить наличие класса active у кнопки
  _isLiked() {
    return this._tempLikeBtn.classList.contains('btn_type_like-active');
  };


  // вот дальше ... нужно все время работать с обновляемыми данными likes
  // Изменить число лайков в карточке
  _setLike(data) {
    this._tempLikes.textContent = data.likes.length; //проверить что кол-во лайков берется из response
  };

  // Проверить наличие лайка от пользователя и изменить цвет кнопкиthis._likes
  _checkAndAddLikeIcon() {
    if(this._checkLike()) {
      this._tempLikeBtn.classList.add('btn_type_like-active');
    } else {
      this._tempLikeBtn.classList.remove('btn_type_like-active');
    }
  };

  // Проверить наличие лайка от пользователя
  _checkLike() {
    return data.likes.some((item) => {
      return item._id === this._myId;
    });
  };


  // Обработчик кнопки лайка
  _likesHandler() {
    this._isLiked() ? api.putAwayLike(this._cardElem) : api.putLike(this._cardElem)
    .then(data => {
      this._setLike(data);

      //мне кажется тут вообще этонадо then сделать, если запрос обработался, тогда меняй стили лайка....
      //думаю что checkAndAddLikeIcon и checkLike надо переписать...
      checkAndAddLikeIcon(evt, checkLike(data.likes, userId))
    })
    .catch(err => console.log(err))
  };


  createCard(data) {
    this._tempElemTitle.textContent = this._name;
    this._tempElemImg.src = this._link;
    this._tempElemImg.alt = this._name;

    //Почему мы тут при отрисовке не проверяем есть ли карточки, которые мы лайкнули ранее?
    //Если в массиве владельцев лайков есть наш id, то сразу добавляем класс active лайку

    if (this._likesLength) {
      this._tempLikes.textContent = this._likesLength;
    } else {
      this._tempLikes.textContent = '0';
    }

    this._tempLikeBtn.addEventListener('click', (evt) => {
      likesHandler(userIdValue, cardIdValue, this._tempLikes, evt);
    });

    this._tempDeleteBtn.addEventListener('click', () => {
      delCardHandler(cardElem, cardIdValue);
    });

    // Открытие попапа
    this._tempElemImg.addEventListener('click', () => {
      elemImgPopupCaption.textContent = titleValue;
      elemImgPopup.src = linkValue;
      elemImgPopup.alt = titleValue;
      openPopup(imgPopup);
    });

    // Сравнить ID пользователя с ID создателя карточки для отображения иконки удаления
    if (ownIdValue && userIdValue !== ownIdValue) {
      deleteBtn.style.display = 'none';
    };

    return this._tempCard;
  }
}
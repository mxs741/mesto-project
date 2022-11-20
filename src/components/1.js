class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._likesLength = data.likes.length;
    this._ownerId = data.owner._id;

    this._tempCard = templateSelector.querySelector('.element').cloneNode(true);
    this._tempElemTitle = this._tempCard.querySelector('.element__title');
    this._tempElemImg = this._tempCard.querySelector('.element__img');
    this._tempLikeBtn = this._tempCard.querySelector('.btn_type_like');
    this._tempDeleteBtn = this._tempCard.querySelector('.btn_type_remove-card');
    this._tempLikes = this._tempCard.querySelector('.element__number-of-likes');
    this._tempCardElem = this._tempDeleteBtn.closest('.element');
  }

  createCard(data) {

    this._tempElemTitle.textContent = this._name;
    this._tempElemImg.src = this._link;
    this._tempElemImg.alt = this._name;
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

  _likesHandler() {
    this._tempLikeBtn.addEventListener('click', (evt) => {
      likesHandler(userIdValue, cardIdValue, this._tempLikes, evt);
    });
  }
}
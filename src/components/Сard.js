export class Card {
  constructor(data, myId, cardTemplate, {removeCardHandler, likesHandler, popupImgOpenHandler}) {
    this._id = data._id;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._likesLength = data.likes.length;
    this._ownerId = data.owner._id;
    this._myId = myId;
    this._likesHandler = likesHandler;
    this._removeCardHandler = removeCardHandler;
    this._popupImgOpenHandler = popupImgOpenHandler;
    this._tempCard = cardTemplate.querySelector('.element').cloneNode(true);
    this._tempElemTitle = this._tempCard.querySelector('.element__title');
    this._tempElemImg = this._tempCard.querySelector('.element__img');
    this._tempLikeBtn = this._tempCard.querySelector('.btn_type_like');
    this._tempDeleteBtn = this._tempCard.querySelector('.btn_type_remove-card');
    this._tempLikes = this._tempCard.querySelector('.element__number-of-likes');
  }

  // Проверить наличие класса active у кнопки
  _isLiked() {
    return this._tempLikeBtn.classList.contains('btn_type_like-active');
  };

  setLike(res) {
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

  // Рендеринг карточки
  createCard() {
    this._tempElemTitle.textContent = this._name;
    this._tempElemImg.src = this._link;
    this._tempElemImg.alt = this._name;
    this._checkAndAddLikeIcon();

    if (this._likesLength) {
      this._tempLikes.textContent = this._likesLength;
    } else {
      this._tempLikes.textContent = '0';
    }

    this._setEventListeners();

    // Сравнить ID пользователя с ID создателя карточки для отображения иконки удаления
    if (this._myId !== this._ownerId) {
      this._tempDeleteBtn.style.display = 'none';
    };

    return this._tempCard;
  }

  // Обработчики карточки
  _setEventListeners() {
    // Лайк
    this._tempLikeBtn.addEventListener('click', () => {
      this._likesHandler(this._isLiked(), this._tempLikeBtn, this._id);
    });

    // Удаление
    this._tempDeleteBtn.addEventListener('click', () => {
      this._removeCardHandler(this._id, this._tempCard);
    });

    // Открытие попапа с изображением
    this._tempElemImg.addEventListener('click', () => {
      this._popupImgOpenHandler(this._name, this._link);
    });
  };
}

// export class Card {
//   constructor(data, myId, cardTemplate, popupImgOpenHandler, removeCard, putLike, putAwayLike) {
//     this._id = data._id;
//     this._name = data.name;
//     this._link = data.link;
//     this._likes = data.likes;
//     this._likesLength = data.likes.length;
//     this._ownerId = data.owner._id;
//     this._myId = myId;
//     this._putLike = putLike;
//     this._putAwayLike = putAwayLike;
//     this._removeCard = removeCard;
//     this._popupImgOpenHandler = popupImgOpenHandler;
//     this._tempCard = cardTemplate.querySelector('.element').cloneNode(true);
//     this._tempElemTitle = this._tempCard.querySelector('.element__title');
//     this._tempElemImg = this._tempCard.querySelector('.element__img');
//     this._tempLikeBtn = this._tempCard.querySelector('.btn_type_like');
//     this._tempDeleteBtn = this._tempCard.querySelector('.btn_type_remove-card');
//     this._tempLikes = this._tempCard.querySelector('.element__number-of-likes');
//   }

//   // Проверить наличие класса active у кнопки
//   _isLiked() {
//     return this._tempLikeBtn.classList.contains('btn_type_like-active');
//   };

//   _setLike(res) {
//     this._tempLikes.textContent = res.likes.length; //проверить что кол-во лайков берется из response
//   };

//   // Проверить наличие лайка от пользователя и изменить цвет кнопки this._likes
//   _checkAndAddLikeIcon() {
//     if(this._checkLike()) {
//       this._tempLikeBtn.classList.add('btn_type_like-active');
//     } else {
//       this._tempLikeBtn.classList.remove('btn_type_like-active');
//     }
//   };

//   // Проверить наличие лайка от пользователя
//   _checkLike() {
//     return this._likes.some((item) => {
//       return item._id === this._myId;
//     });
//   };

//   // Обработчик кнопки лайка
//   _likesHandler() {
//     (this._isLiked() ? this._putAwayLike(this._id) : this._putLike(this._id))
//     .then(data => {
//       this._setLike(data);
//       this._tempLikeBtn.classList.toggle('btn_type_like-active');
//     })
//     .catch(err => console.log(err))
//   };

//   // Обработчик кнопки удаления карточки
//   _delCardBtnHandler() {
//     this._removeCard(this._id)
//       .then(() => {
//         this._tempCard.remove();
//       })
//       .catch(err => console.log(err))
// };

//   createCard() {
//     this._tempElemTitle.textContent = this._name;
//     this._tempElemImg.src = this._link;
//     this._tempElemImg.alt = this._name;
//     this._checkAndAddLikeIcon();

//     if (this._likesLength) {
//       this._tempLikes.textContent = this._likesLength;
//     } else {
//       this._tempLikes.textContent = '0';
//     }

//     this._setEventListeners();

//     // Сравнить ID пользователя с ID создателя карточки для отображения иконки удаления
//     if (this._myId !== this._ownerId) {
//       this._tempDeleteBtn.style.display = 'none';
//     };

//     return this._tempCard;
//   }

//   _setEventListeners() {
//     this._tempLikeBtn.addEventListener('click', () => {
//       this._likesHandler();
//     });

//     this._tempDeleteBtn.addEventListener('click', () => {
//       this._delCardBtnHandler();
//     });

//     // Открытие попапа
//     this._tempElemImg.addEventListener('click', () => {
//       this._popupImgOpenHandler(this._name, this._link);
//     });
//   };
// }
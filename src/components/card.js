import {openPopup} from './modal.js';
import {title, link, elements, cardTemplate, imgPopup, elemImgPopup, elemImgPopupCaption} from './variables.js';

// Создание карточки
function createCard(titleValue, linkValue, cardIdValue, userIdValue, likesHandler, delCardHandler, likesCountValue, ownIdValue) {
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  const elemTitle = card.querySelector('.element__title');
  const elemImg = card.querySelector('.element__img');
  const likeBtn = card.querySelector('.btn_type_like');
  const deleteBtn = card.querySelector('.btn_type_remove-card');
  const likes = card.querySelector('.element__number-of-likes');
  const cardElem = deleteBtn.closest('.element');

  elemTitle.textContent = titleValue;
  elemImg.src = linkValue;
  elemImg.alt = titleValue;
  if (likesCountValue) {
    likes.textContent = likesCountValue;
  } else {
    likes.textContent = '0';
  }

  likeBtn.addEventListener('click', (evt) => {
    likesHandler(userIdValue, cardIdValue, likes, evt);
  });

  deleteBtn.addEventListener('click', () => {
    delCardHandler(cardElem, cardIdValue);
  });

  // Открытие попапа
  elemImg.addEventListener('click', () => {
    elemImgPopupCaption.textContent = titleValue;
    elemImgPopup.src = linkValue;
    elemImgPopup.alt = titleValue;
    openPopup(imgPopup);
  });

  // Сравнить ID пользователя с ID создателя карточки для отображения иконки удаления
  if (ownIdValue && userIdValue !== ownIdValue) {
    deleteBtn.style.display = 'none';
  };

  return card;
};

// Проверить наличие лайка от пользователя
function checkLike(likes, userId) {
  return likes.some((item) => {
    return item._id === userId
  });
};

// Проверить наличие лайка от пользователя и изменить цвет кнопки
function checkAndAddLikeIcon(evt, check) {
  if(check) {
    evt.target.classList.add('btn_type_like-active');
  } else {
    evt.target.classList.remove('btn_type_like-active');
  }
};

// Проверить наличие класса active у кнопки
function isLiked(evt) {
  return evt.target.classList.contains('btn_type_like-active')
};

// Изменить число лайков в карточке
function setLike(likesCounter, dataOfLikes) {
  likesCounter.textContent = dataOfLikes;
};

// Добавление карточки на страницу
function addCard(cardId, userId, likesHandler, delCardHandler) {
  elements.prepend(createCard(title.value, link.value, cardId, userId, likesHandler, delCardHandler));
};

export {addCard, createCard, checkLike, setLike, checkAndAddLikeIcon, isLiked};
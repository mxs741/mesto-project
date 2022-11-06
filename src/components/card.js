import {openPopup} from './modal.js';
import {title, link, elements, cardTemplate, imgPopup, elemImgPopup, elemImgPopupCaption} from './variables.js';

// Создание карточки
function createCard(titleValue, linkValue, likesCountValue, ownIdValue, cardIdValue, likesValue, userIdValue, delRequest, setLikeRequest, removeLikeRequest) {
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

  // if (checkLike(likesValue, userIdValue)) {
  //   likeBtn.classList.add('btn_type_like-active')
  // }

  likeBtn.addEventListener('click', (evt) => {
    if (checkLike(likesValue, userIdValue)) {
      removeLikeRequest(cardIdValue)
        .then((data) => {
          likesValue = data.likes;
          likes.textContent = data.likes.length;
        })
        .catch(err => console.log(err))
    } else if (!checkLike(likesValue, userIdValue)) {
      setLikeRequest(cardIdValue)
        .then((data) => {
          likesValue = data.likes;
          likes.textContent = data.likes.length;
        })
        .catch(err => console.log(err))
    }
    setLike(evt)
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
    deleteBtn.style.display = 'none'
  }

  deleteBtn.addEventListener('click', function() {
    delCard(delRequest, cardElem, cardIdValue);
  });

  return card;
};

// function countLikes(likesCounter, likesNum, data) {
//   likesNum = data.likes;
//   likesCounter.textContent = data.likes.length;
// }

// Лайк карточки
function setLike(evt) {
  evt.target.classList.toggle('btn_type_like-active');
};

//Проверка наличия лайка от пользователя
function checkLike(likes, ownId) {
  return likes.some((item) => {
    return item._id === ownId
  });
};

// Удаление карточки
function delCard(delRequest, element, cardId) {
  delRequest(cardId);
  element.remove();
};

// Добавление карточки на страницу
function addCard() {
  elements.prepend(createCard(title.value, link.value));
};

export {addCard, createCard};
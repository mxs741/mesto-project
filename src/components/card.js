import {openPopup} from './modal.js';
import {putLike, putAwayLike, removeCard, getProfileInfo} from './api.js';

const title = document.querySelector('.form__input_type_name');
const link = document.querySelector('.form__input_type_link');
const elements = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element-template').content;
const imgPopup = document.querySelector('.popup_element');
const elemImgPopup = imgPopup.querySelector('.element__img_size_full');
const elemImgPopupCaption = imgPopup.querySelector('.element__img-caption');


// Создание карточки
function createCard(titleValue, linkValue, likesCountValue, ownIdValue, cardIdValue, likesValue, userIdValue) {
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
    if (checkLike(likesValue, userIdValue)) {
      putAwayLike(cardIdValue).then((data) => {
        likesValue = data.likes;
        likes.textContent = data.likes.length;
      }).catch(err => console.log(err))
    } else if (!checkLike(likesValue, userIdValue)) {
      putLike(cardIdValue).then((data) => {
        likesValue = data.likes;
        likes.textContent = data.likes.length;
      }).catch(err => console.log(err))
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

  if (ownIdValue) {
    getUserIdAndDisableBtn(deleteBtn, ownIdValue)
  }

  deleteBtn.addEventListener('click', function() {
    delCard(cardElem, cardIdValue);
  });

  return card;
};

// Лайк карточки
function setLike(evt) {
  evt.target.classList.toggle('btn_type_like-active');
};

//Проверка наличия лайка от пользователя
function checkLike(likes, ownId) {
  return likes.some((item) => {
    return item._id === ownId
  })
}

// Удаление карточки
function delCard(element, cardId) {
  removeCard(cardId);
  element.remove();
};

// Добавление карточки на страницу
function addCard() {
  elements.prepend(createCard(title.value, link.value));
};

// получить айди юзера и сравнить с айди карточки для удаления кнопки
function getUserIdAndDisableBtn(btn, ownId) {
  getProfileInfo()
    .then(data => {
      if (data._id !== ownId) {
        btn.style.display = 'none';
      }
    })
}

export {addCard, createCard, title, link, elements};
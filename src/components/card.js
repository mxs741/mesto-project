import {openPopup} from './utils.js';
const title = document.querySelector('.form__input_type_name');
const link = document.querySelector('.form__input_type_link');
const elements = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element-template').content;
const popup = document.querySelector('.popup_element');
const elemImgPopup = popup.querySelector('.element__img_size_full');
const elemImgPopupCaption = popup.querySelector('.element__img-caption');
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Создание карточки
function createCard(titleValue, linkValue) {
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  const elemTitle = card.querySelector('.element__title');
  const elemImg = card.querySelector('.element__img');
  const likeBtn = card.querySelector('.btn_type_like');
  const deleteBtn = card.querySelector('.btn_type_remove-card');
  const cardElem = deleteBtn.closest('.element');

  elemTitle.textContent = titleValue;
  elemImg.src = linkValue;
  elemImg.alt = titleValue;

  // Лайк карточки
  likeBtn.addEventListener('click', function(evt) {
    evt.target.classList.toggle('btn_type_like-active');
  });

  // Открытие попапа
  elemImg.addEventListener('click', () => {
    elemImgPopupCaption.textContent = titleValue;
    elemImgPopup.src = linkValue;
    elemImgPopup.alt = titleValue;
    openPopup(popup);
  });

  // Удаление карточки
  deleteBtn.addEventListener('click', function() {
  cardElem.remove();
  });

  return card;
};

// Добавление карточки на страницу
function addCard() {
  elements.prepend(createCard(title.value, link.value));
}

// 6 стандартных карточек
initialCards.forEach(function(item) {
  elements.append(createCard(item.name, item.link));
});

export {addCard, createCard, title, link};
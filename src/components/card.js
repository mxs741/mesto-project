import {openPopup} from './modal.js';
const title = document.querySelector('.form__input_type_name');
const link = document.querySelector('.form__input_type_link');
const elements = document.querySelector('.elements');
const cardTemplate = document.querySelector('#element-template').content;
const imgPopup = document.querySelector('.popup_element');
const elemImgPopup = imgPopup.querySelector('.element__img_size_full');
const elemImgPopupCaption = imgPopup.querySelector('.element__img-caption');


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

  likeBtn.addEventListener('click', setLike);

  // Открытие попапа
  elemImg.addEventListener('click', () => {
    elemImgPopupCaption.textContent = titleValue;
    elemImgPopup.src = linkValue;
    elemImgPopup.alt = titleValue;
    openPopup(imgPopup);
  });

  // Удаление карточки
  deleteBtn.addEventListener('click', function() {
    delCard(cardElem);
  });

  return card;
};

// Лайк карточки
function setLike(evt) {
  evt.target.classList.toggle('btn_type_like-active');
};

// Удаление карточки
function delCard(element) {
  element.remove();
};

// Добавление карточки на страницу
function addCard() {
  elements.prepend(createCard(title.value, link.value));
};

export {addCard, createCard, title, link, elements};
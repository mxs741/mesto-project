import '../pages/index.css';
import {openPopup, closePopup, closePopupClickingOutside} from './modal.js';
import {elements, createCard, addCard, title, link} from './card.js';
import enableValidation from './validate.js';

const addForm = document.querySelector('.popup_add');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const editFormPopup = document.querySelector('.popup_edit');
const inputName = document.querySelector('.form__input_name');
const inputDescription = document.querySelector('.form__input_description');
const editBtn = document.querySelector('.btn_type_edit');
const addBtn = document.querySelector('.btn_type_add');
const formEdit = document.querySelector('.form__edit');
const formAdd = document.querySelector('.form__add');
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


// Открытие формы редактирования профиля
editBtn.addEventListener('click', function() {
  openPopup(editFormPopup);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

// Форма редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(editFormPopup);
};

// Форма добавления карточки
function handleAddFormSubmit(evt) {
  const createBtn = document.querySelector('.form__btn_type_create');
  evt.preventDefault();
  addCard(title.value, link.value);
  evt.target.reset();
  createBtn.disabled = true;
  createBtn.classList.add('form__btn_inactive');
  closePopup(addForm);
};

// Отправка формы редактирования профиля
formEdit.addEventListener('submit', handleProfileFormSubmit);

// Открытие формы добавления карточки
addBtn.addEventListener('click', () => openPopup(addForm));

// Отправка формы добавления карточки
formAdd.addEventListener('submit', handleAddFormSubmit);

// 6 стандартных карточек
initialCards.forEach(function(item) {
  elements.append(createCard(item.name, item.link));
});

closePopupClickingOutside();

// Включить валидацию
enableValidation();
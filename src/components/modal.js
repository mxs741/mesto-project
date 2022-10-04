import {addCard, title, link} from './card.js';
import {closePopup} from './utils.js';
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const inputName = document.querySelector('.form__input_name');
const inputDescription = document.querySelector('.form__input_description');
const addForm = document.querySelector('.popup_add');
const editFormPopup = document.querySelector('.popup_edit');
const closeButtons = document.querySelectorAll('.btn_type_close');

// Закрытие попапа на 'Escape'
function closePopupWithEscKey(evt) {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  };
};

// Закрытие попапа по щелчку за пределами формы
function closePopupClickingOutside() {
    const popupOpenedArr = Array.from(document.querySelectorAll('.popup'));
    popupOpenedArr.forEach((popup) => {
      popup.addEventListener('click', (evt) => {
        evt.target.classList.remove('popup_opened');
    });
  });
};

// Кнопки закрытия попапов
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
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
  evt.preventDefault();
  addCard(title.value, link.value);

  evt.target.reset();
  closePopup(addForm);
};

export {handleAddFormSubmit, handleProfileFormSubmit, profileName, profileDescription, inputName, inputDescription, addForm, editFormPopup, closePopupWithEscKey, closePopupClickingOutside};
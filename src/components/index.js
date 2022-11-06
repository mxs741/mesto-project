import '../pages/index.css';
import {openPopup, closePopup, closePopupClickingOutside} from './modal.js';
import {createCard, addCard} from './card.js';
import enableValidation from './validate.js';
import {getInitialCards, getProfileInfo, postProfileInfo, postCard, postAvatarLink, putLike, putAwayLike, removeCard} from './api.js';
import {addForm, profileName, profileDescription, editFormPopup, inputName, inputDescription, editBtn, addBtn, formEdit, formAdd, formEditAvatar, editAvatarPopup, editAvatar, profileAvatar, createBtn, editAvatarBtn, inputProfileAvatar, editProfileBtn, title, link, elements} from './variables.js';

// Получение информации о пользователе и карточках
Promise.all([getProfileInfo(), getInitialCards()])
  .then(data => {
    profileName.textContent = data[0].name;
    profileDescription.textContent = data[0].about;
    profileAvatar.src = data[0].avatar;
    data[1].forEach(function(item) {
      elements.append(createCard(item.name, item.link, item.likes.length, item.owner._id, item._id, item.likes, data[0]._id, removeCard, putLike, putAwayLike));
    });
  })
  .catch(err => console.log(err))

// Форма редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  editProfileBtn.textContent = 'Сохранение...'
  postProfileInfo({
    name: profileName.textContent,
    about: profileDescription.textContent
  })
    .then(() => {
      closePopup(editFormPopup);
    })
    .catch(err => console.log(err))
    .finally(() => {
      editProfileBtn.textContent = 'Сохранить';
    })
};

// Форма добавления карточки
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  addCard(title.value, link.value);
  createBtn.textContent = 'Сохранение...';
  postCard(title.value, link.value)
    .then(() => {
      evt.target.reset();
      createBtn.disabled = true;
      createBtn.classList.add('form__btn_inactive');
      closePopup(addForm);
    })
    .catch(err => console.log(err))
    .finally(() => {
      createBtn.textContent = 'Создать';
    })
};

// Форма установки аватара
function handleFormEditAvatarSubmit(evt) {
  evt.preventDefault();
  profileAvatar.src = inputProfileAvatar.value;
  editAvatarBtn.textContent = 'Сохранение...';
  postAvatarLink({
    avatar: profileAvatar.src,
  })
    .then(() => {
      closePopup(editAvatarPopup);
      editAvatarBtn.textContent = 'Сохранить';
    })
    .catch(err => console.log(err))
    .finally(() => {
      editAvatarBtn.textContent = 'Сохранить';
    })
};


// Открытие формы редактирования профиля
editBtn.addEventListener('click', function() {
  openPopup(editFormPopup);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

// Отправка формы редактирования профиля
formEdit.addEventListener('submit', handleProfileFormSubmit);

// Открытие формы установки аватара
editAvatar.addEventListener('click', () => openPopup(editAvatarPopup));

// Отправка формы установки аватара
formEditAvatar.addEventListener('submit', handleFormEditAvatarSubmit);

// Открытие формы добавления карточки
addBtn.addEventListener('click', () => openPopup(addForm));

// Отправка формы добавления карточки
formAdd.addEventListener('submit', handleAddFormSubmit);

closePopupClickingOutside();

// Включить валидацию
enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  btnSelector: '.form__btn',
  btnInactive: 'form__btn_inactive',
  formInputError: 'form__input_type_error',
  formErrorMessage: 'form__error-message_activate',
});
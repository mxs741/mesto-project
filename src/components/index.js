import '../pages/index.css';
import {profileName, profileDescription, inputName, inputDescription, editBtn, addBtn, formEdit, formAdd, formEditAvatar, editAvatar, profileAvatar, createBtn, editAvatarBtn, inputProfileAvatar, editProfileBtn, title, link, elements, cardTemplate, popupAvatarForm, popupEditForm, popupAddForm} from './variables.js';
import {api} from './api.js';
import {Card} from './card.js';
import {FormValidator} from './formValidator.js';

popupAvatarForm.setEventListeners();
popupEditForm.setEventListeners();
popupAddForm.setEventListeners();

// Получение информации о пользователе и карточках
Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(data => {
    profileName.textContent = data[0].name;
    profileDescription.textContent = data[0].about;
    profileAvatar.src = data[0].avatar;
    data[1].forEach(function(item) {
      const card = new Card(item, data[0]._id, cardTemplate);
      card.createCard();
      card.renderCard(elements, true);
    });
  })
  .catch(err => console.log(err))

// Форма редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  editProfileBtn.textContent = 'Сохранение...';
  api.postProfileInfo({
    name: inputName.value,
    about: inputDescription.value
  })
    .then(() => {
      profileName.textContent = inputName.value;
      profileDescription.textContent = inputDescription.value;
      popupEditForm.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      editProfileBtn.textContent = 'Сохранить';
    })
};

// Форма добавления карточки
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  createBtn.textContent = 'Сохранение...';
  api.postCard(title.value, link.value)
    .then((data) => {
      const card = new Card(data, data.owner._id, cardTemplate);
      card.addCard(data);
      evt.target.reset();
      createBtn.disabled = true;
      createBtn.classList.add('form__btn_inactive');
      popupAddForm.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      createBtn.textContent = 'Создать';
    })
};

// Форма установки аватара
function handleFormEditAvatarSubmit(evt) {
  evt.preventDefault();
  editAvatarBtn.textContent = 'Сохранение...';
  api.postAvatarLink({
    avatar: inputProfileAvatar.value,
  })
    .then(() => {
      profileAvatar.src = inputProfileAvatar.value;
      popupAvatarForm.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      editAvatarBtn.textContent = 'Сохранить';
    })
};

// Открытие формы редактирования профиля
editBtn.addEventListener('click', function() {
  popupEditForm.open();
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

// Отправка формы редактирования профиля
formEdit.addEventListener('submit', handleProfileFormSubmit);

// Открытие формы установки аватара
editAvatar.addEventListener('click', () => popupAvatarForm.open());

// Отправка формы установки аватара
formEditAvatar.addEventListener('submit', handleFormEditAvatarSubmit);

// Открытие формы добавления карточки
addBtn.addEventListener('click', () => popupAddForm.open());

// Отправка формы добавления карточки
formAdd.addEventListener('submit', handleAddFormSubmit);


// Включить валидацию
const settings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  btnSelector: '.form__btn',
  btnInactive: 'form__btn_inactive',
  formInputError: 'form__input_type_error',
  formErrorMessage: 'form__error-message_activate',
};

const formUserInfo = new FormValidator(settings, '.form__edit');
formUserInfo.enableValidation();

const formUserAvatar = new FormValidator(settings, '.form__edit-avatar');
formUserAvatar.enableValidation();

const formAddCard = new FormValidator(settings, '.form__add');
formAddCard.enableValidation();
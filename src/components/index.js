import '../pages/index.css';
import {openPopup, closePopup, closePopupClickingOutside} from './modal.js';
import {createCard, addCard, checkLike, isLiked, checkAndAddLikeIcon, setLike} from './card.js';
import enableValidation from './validate.js';
import {addForm, profileName, profileDescription, editFormPopup, inputName, inputDescription, editBtn, addBtn, formEdit, formAdd, formEditAvatar, editAvatarPopup, editAvatar, profileAvatar, createBtn, editAvatarBtn, inputProfileAvatar, editProfileBtn, title, link, elements, cfg} from './variables.js';
import {Api} from './Api.js'

const api = new Api(cfg)

// Получение информации о пользователе и карточках
Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(data => {
    profileName.textContent = data[0].name;
    profileDescription.textContent = data[0].about;
    profileAvatar.src = data[0].avatar;
    data[1].forEach(function(item) {
      elements.append(createCard(item.name, item.link, item._id, data[0]._id, likesHandler, delCardBtnHandler, item.likes.length, item.owner._id));
    });
  })
  .catch(err => console.log(err))


// Обработчик кнопки лайка
function likesHandler(userId, cardId, likesCounter, evt) {
  (isLiked(evt) ? api.putAwayLike(cardId) : api.putLike(cardId))
    .then(data => {
      setLike(likesCounter, data.likes.length);
      checkAndAddLikeIcon(evt, checkLike(data.likes, userId))
    })
    .catch(err => console.log(err))
};

// Обработчик кнопки удаления карточки
function delCardBtnHandler(element, cardId) {
  api.removeCard(cardId)
    .then(() => {
      element.remove();
    })
    .catch(err => console.log(err))
};

// Форма редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  editProfileBtn.textContent = 'Сохранение...'
  api.postProfileInfo({
    name: inputName.value,
    about: inputDescription.value
  })
    .then(() => {
      profileName.textContent = inputName.value;
      profileDescription.textContent = inputDescription.value;
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
  createBtn.textContent = 'Сохранение...';
  api.postCard(title.value, link.value)
    .then((data) => {
      addCard(data._id, data.owner._id, likesHandler, delCardBtnHandler);
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
  editAvatarBtn.textContent = 'Сохранение...';
  api.postAvatarLink({
    avatar: inputProfileAvatar.value,
  })
    .then(() => {
      profileAvatar.src = inputProfileAvatar.value;
      closePopup(editAvatarPopup);
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
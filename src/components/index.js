import '../pages/index.css';
import {openPopup, closePopup, closePopupClickingOutside} from './modal.js';
import {elements, createCard, addCard, title, link} from './card.js';
import enableValidation from './validate.js';
import {getInitialCards, getProfileInfo, postProfileInfo, postCard, postAvatarLink, removeCard} from './api.js';
import {addForm, profileName, profileDescription, editFormPopup, inputName, inputDescription, editBtn, addBtn, formEdit, formAdd, formEditAvatar, editAvatarPopup, editAvatar, profileAvatar, initialCards, createBtn, editAvatarBtn, inputProfileAvatar, editProfileBtn} from './variables.js';


getProfileInfo()
  .then(data => {
    profileName.textContent = data.name;
    profileDescription.textContent = data.about;
    profileAvatar.src = data.avatar;
    const userId = data._id;
    getInitialCards()
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          initialCards.push(
            {
              name: data[i].name,
              link: data[i].link,
              _id: data[i]._id,
              owner_id: data[i].owner._id,
              likes: data[i].likes,
            }
          )
        }
      })
      .then(() => {
        initialCards.forEach(function(item) {
          elements.append(createCard(item.name, item.link, item.likes.length, item.owner_id, item._id, item.likes, userId));
        });
      })
      .catch(err => console.log(err))
  })

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
      editProfileBtn.textContent = 'Сохранить'
    })
    .catch(err => console.log(err))
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
      createBtn.textContent = 'Создать';
    })
    .catch(err => console.log(err))
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
};


// Открытие формы редактирования профиля
editBtn.addEventListener('click', function() {
  openPopup(editFormPopup);
  getProfileInfo()
    .then(data => {
      inputName.value = data.name;
      inputDescription.value = data.about;
    })
    .catch(err => console.log(err))
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
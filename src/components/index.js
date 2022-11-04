import '../pages/index.css';
import {openPopup, closePopup, closePopupClickingOutside} from './modal.js';
import {elements, createCard, addCard, title, link} from './card.js';
import enableValidation from './validate.js';
import {getInitialCards, getProfileInfo, postProfileInfo, postCard, postAvatarLink} from './api.js';

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
const formEditAvatar = document.querySelector('.form__edit-avatar');
const editAvatarPopup = document.querySelector('.popup_edit-avatar');
const editAvatar = document.querySelector('.profile__avatar-wrapper');
const profileAvatar = document.querySelector('.profile__avatar');
const initialCards = [];


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
  const btn = document.querySelector('.form__btn_edit-profile')
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  btn.textContent = 'Сохранение...'
  postProfileInfo({
    name: profileName.textContent,
    about: profileDescription.textContent
  })
    .then(() => {
      closePopup(editFormPopup);
      btn.textContent = 'Сохранить'
    })
    .catch(err => console.log(err))
};

// Форма добавления карточки
function handleAddFormSubmit(evt) {
  const createBtn = document.querySelector('.form__btn_type_create');
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
  const inputProfileAvatar = document.querySelector('.form__input-avatar-link');
  const btn = document.querySelector('.form__btn_edit-avatar')
  evt.preventDefault();
  profileAvatar.src = inputProfileAvatar.value;
  btn.textContent = 'Сохранение...';
  postAvatarLink({
    avatar: profileAvatar.src,
  })
    .then(() => {
      closePopup(editAvatarPopup);
      btn.textContent = 'Сохранить';
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
enableValidation();
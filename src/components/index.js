import '../pages/index.css';
import {profileName, profileDescription, inputName, inputDescription, editBtn, addBtn, formEdit, formAdd,
   formEditAvatar, editAvatar, profileAvatar, createBtn, editAvatarBtn, inputProfileAvatar, editProfileBtn, 
   title, link, elements, cardTemplate, popupAvatarForm, popupEditForm, popupAddForm, formUserInfo, formUserAvatar, formAddCard} from './variables.js';
import {api} from './api.js';
import {Card} from './card.js';
import {Section} from './section.js';
import {UserInfo} from './userInfo.js';

popupAvatarForm.setEventListeners();
popupEditForm.setEventListeners();
popupAddForm.setEventListeners();

const user = new UserInfo();

// Получение информации о пользователе и карточках
Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(data => {
    user.getUserInfo(data[0]);
    profileName.textContent = user._name;
    profileDescription.textContent = user._about;
    profileAvatar.src = user._avatar;
    const items = data[1];    
    items.reverse().forEach((item) => {
      const card = new Card(item, data[0]._id, cardTemplate);
      const renderer = card.createCard();
      const places = new Section({card, renderer}, '.elements');
      places.addItem(renderer);
    });
  })
  .catch(err => console.log(err))

// Форма редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  editProfileBtn.textContent = 'Сохранение...';
  user.setUserInfo(inputName.value, inputDescription.value);
};

// Форма добавления карточки
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  createBtn.textContent = 'Сохранение...';
  api.postCard(title.value, link.value)
    .then((data) => {
      const card = new Card(data, data.owner._id, cardTemplate);      
      const renderer = card.createCard();
      const places = new Section({card, renderer}, '.elements');
      
      places.addItem(renderer);
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
  inputName.value = user._name;
  inputDescription.value = user._about;
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

formUserAvatar.enableValidation();
formUserInfo.enableValidation();
formAddCard.enableValidation();
import './index.css';
import {profileName, profileDescription, inputName, inputDescription, editBtn, addBtn,
   editAvatar, profileAvatar, createBtn, editAvatarBtn, inputProfileAvatar, editProfileBtn,
   title, link, cardTemplate, popupAvatarForm, popupEditForm, popupAddForm, formUserInfo, formUserAvatar, formAddCard} from '../utils/variables.js';
import {api} from '../components/Api.js';
import {Card} from '../components/Сard.js';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';

// Отправка формы установки аватара
popupAvatarForm.setEventListeners(handleFormEditAvatarSubmit);
// Отправка формы редактирования профиля
popupEditForm.setEventListeners(handleProfileFormSubmit);
// Отправка формы добавления карточки
popupAddForm.setEventListeners(handleAddFormSubmit);


formUserAvatar.enableValidation();
formUserInfo.enableValidation();
formAddCard.enableValidation();

const user = new UserInfo();
const places = new Section('.elements');

// Получение информации о пользователе и карточках
Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(data => {
    user.getUserInfo(data[0]);
    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    profileAvatar.src = user.avatar;
    const items = data[1];
    items.reverse().forEach((item) => {
      const card = new Card(item, data[0]._id, cardTemplate);
      const renderer = card.createCard();
      places.addItem(renderer);
    });
  })
  .catch(err => console.log(err))

// Форма редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  editProfileBtn.textContent = 'Сохранение...';
  user.setUserInfo(inputName.value, inputDescription.value);
  user.name = inputName.value;
  user.about = inputDescription.value;
};

// Форма добавления карточки
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  createBtn.textContent = 'Сохранение...';
  api.postCard(title.value, link.value)
    .then((data) => {
      const card = new Card(data, data.owner._id, cardTemplate);
      const renderer = card.createCard();

      places.addItem(renderer);
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
  inputName.value = user.name;
  inputDescription.value = user.about;
});

// Открытие формы установки аватара
editAvatar.addEventListener('click', () => popupAvatarForm.open());
// Открытие формы добавления карточки
addBtn.addEventListener('click', () => popupAddForm.open());


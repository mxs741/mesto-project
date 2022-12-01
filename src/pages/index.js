import './index.css';
import {formEdit, formAdd, inputName, inputDescription, editBtn, addBtn,
   editAvatar, formEditAvatar, createBtn, editAvatarBtn, inputProfileAvatar, editProfileBtn,
   title, link, cardTemplate, cfg, editAvatarPopup, editFormPopup, addFormPopup, imgPopup, elemImgPopupCaption, elemImgPopup, settings} from '../utils/variables.js';
import {Api} from '../components/Api.js';
import {Card} from '../components/Сard.js';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {FormValidator} from '../components/FormValidator.js';

const api = new Api(cfg);
const popupAvatarForm = new PopupWithForm(editAvatarPopup, handleFormEditAvatarSubmit);
const popupEditForm = new PopupWithForm(editFormPopup, handleProfileFormSubmit);
const popupAddForm = new PopupWithForm(addFormPopup, handleAddFormSubmit);
const popupImg = new PopupWithImage(imgPopup, elemImgPopupCaption, elemImgPopup);
const formUserInfo = new FormValidator(settings, formEdit);
const formUserAvatar = new FormValidator(settings, formEditAvatar);
const formAddCard = new FormValidator(settings, formAdd);

const user = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');
const places = new Section('.elements');

// Отправка формы установки аватара
popupAvatarForm.setEventListeners();
// Отправка формы редактирования профиля
popupEditForm.setEventListeners();
// Отправка формы добавления карточки
popupAddForm.setEventListeners();

popupImg.setEventListeners();


formUserAvatar.enableValidation();
formUserInfo.enableValidation();
formAddCard.enableValidation();


// Получение информации о пользователе и карточках
Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(data => {
    user.setUserInfo(data[0]);
    // небольшая заготовка кода после создания createCard и применения renderItems из Section
    // const renderer = card.createCard();
    // const places = new Section({items: data[1], renderer: renderer}, '.elements');
    // places.renderItems(data[1])
    const items = data[1];
    items.reverse().forEach((item) => {
      const card = new Card(item, user.myId, cardTemplate, popupImgOpenHandler, delCard, putLike, putAwayLike);
      const renderer = card.createCard();
      places.addItem(renderer);
    });
  })
  .catch(err => console.log(err))

// Создать функцию, возвращающую карточку с её обработчиками
// function createCard() {
//   const card = new Card(...)
//   return card
// }

// Форма редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  editProfileBtn.textContent = 'Сохранение...';

  
  //const {name, about} = editFormPopup._getInputValues();
  api.postProfileInfo({
    name: inputName.value, //name и about
    about: inputDescription.value
  })
    .then((data) => {
      user.setUserInfo({name: data.name, about: data.about});
      popupEditForm.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      editProfileBtn.textContent = 'Сохранить';
    })
};

function popupImgOpenHandler(name, link) {
  popupImg.open(name, link)
}

function putLike(id) {
  return api.putLike(id)
}

function putAwayLike(id) {
  return api.putAwayLike(id)
}

function delCard(id) {
  return api.removeCard(id)
}

// Форма добавления карточки
function handleAddFormSubmit(evt) {
  evt.preventDefault();
  createBtn.textContent = 'Сохранение...';
  
  //const {title, link} = addFormPopup._getInputValues();
  api.postCard(title.value, link.value) //title и link используем сверху
    .then((data) => {
      const card = new Card(data, data.owner._id, cardTemplate, popupImgOpenHandler, delCard, putLike, putAwayLike);
      const renderer = card.createCard();

      places.addItem(renderer);
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

  //const {avatar} = editAvatarPopup._getInputValues();
  api.postAvatarLink({
    avatar: inputProfileAvatar.value, //тут исп avatar
  })
    .then((data) => {
      user.setUserInfo({avatar : data.avatar});
      popupAvatarForm.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      editAvatarBtn.textContent = 'Сохранить';
    })
};

// Открытие формы редактирования профиля
editBtn.addEventListener('click', function() {
  formUserInfo.resetValidation();
  popupEditForm.open();
  const {name, about} = user.getUserInfo();
  inputName.value = name;
  inputDescription.value = about;
});

// Открытие формы установки аватара
editAvatar.addEventListener('click', () => {
  formUserAvatar.resetValidation();
  popupAvatarForm.open();
});
// Открытие формы добавления карточки
addBtn.addEventListener('click', () => {
  formAddCard.resetValidation();
  popupAddForm.open()
});


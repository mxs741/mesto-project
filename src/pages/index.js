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
let userInfo
let section

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
    userInfo = new UserInfo('.profile__name', '.profile__description', '.profile__avatar')
    userInfo.setUserInfo(data[0]);
    section = new Section({
      items: data[1],
      renderer: (item) => {
        const renderer = createCard(item)
        section.addItem(renderer)
      }
    },
    '.elements');
    section.renderItems()
  })
  .catch(err => console.log(err))

// Создать функцию, возвращающую карточку с её обработчиками
function createCard(item) {
  const card = new Card(
    item,
    userInfo.myId,
    cardTemplate,
    {
      removeCardHandler: (cardId, element) => {
        api.removeCard(cardId)
          .then(() => {
            element.remove();
          })
          .catch(err => console.log(err))
      },
      likesHandler: (isLiked, btn, cardId) => {
        (isLiked ? api.putAwayLike(cardId) : api.putLike(cardId))
          .then(data => {
            card.setLike(data);
            btn.classList.toggle('btn_type_like-active');
          })
          .catch(err => console.log(err))
      },
      popupImgOpenHandler: (name, link) => {
        popupImg.open(name, link)
      }
    })
  return card.createCard()
}

// Форма редактирования профиля
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  editProfileBtn.textContent = 'Сохранение...';
  api.postProfileInfo({
    name: inputName.value,
    about: inputDescription.value
  })
    .then(() => {
      user.setUserInfo({name: inputName.value, about: inputDescription.value});
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
      const renderer = createCard(data);
      section.addItem(renderer);
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
      user.setUserInfo({avatar : inputProfileAvatar.value});
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


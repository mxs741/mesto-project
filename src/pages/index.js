import './index.css';
import {formEdit, formAdd, inputName, inputDescription, editBtn, addBtn,
   editAvatar, formEditAvatar, createBtn, editAvatarBtn, editProfileBtn, cardTemplate, cfg, editAvatarPopup, editFormPopup, addFormPopup, imgPopup, elemImgPopupCaption, elemImgPopup, settings} from '../utils/variables.js';
import {Api} from '../components/Api.js';
import {Card} from '../components/Сard.js';
import {Section} from '../components/Section.js';
import {UserInfo} from '../components/UserInfo.js';
import {PopupWithForm} from '../components/PopupWithForm.js';
import {PopupWithImage} from '../components/PopupWithImage.js';
import {FormValidator} from '../components/FormValidator.js';

const api = new Api(cfg);
const popupImg = new PopupWithImage(imgPopup, elemImgPopupCaption, elemImgPopup);
const formUserInfo = new FormValidator(settings, formEdit);
const formUserAvatar = new FormValidator(settings, formEditAvatar);
const formAddCard = new FormValidator(settings, formAdd);
const userInfo = new UserInfo('.profile__name', '.profile__description', '.profile__avatar');
let section;

popupImg.setEventListeners();

formUserAvatar.enableValidation();
formUserInfo.enableValidation();
formAddCard.enableValidation();

// Получение информации о пользователе и карточках
Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(data => {
    userInfo.setUserInfo(data[0]);
    section = new Section({
      items: data[1],
      renderer: (item) => {
        const renderer = createCard(item);
        section.addItem(renderer);
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
        popupImg.open(name, link);
      }
    })
  return card.createCard();
};

// Форма редактирования профиля
const popupEditForm = new PopupWithForm(editFormPopup, (evt,  getInputValues) => {
  evt.preventDefault();
  editProfileBtn.textContent = 'Сохранение...';
  const {name, about} = getInputValues;
  api.postProfileInfo({
    name: name,
    about: about
  })
    .then((data) => {
      userInfo.setUserInfo({name: data.name, about: data.about});
      popupEditForm.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      editProfileBtn.textContent = 'Сохранить';
    })
});
popupEditForm.setEventListeners();

// Форма добавления карточки
const popupAddForm = new PopupWithForm(addFormPopup, (evt, getInputValues) => {
  evt.preventDefault();
  createBtn.textContent = 'Сохранение...';

  const {title, link} = getInputValues;
  api.postCard(title, link)
    .then((data) => {
      const renderer = createCard(data);
      section.addItem(renderer);
      popupAddForm.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      createBtn.textContent = 'Создать';
    })
});
popupAddForm.setEventListeners();

// Форма редактирования аватара
const popupAvatarForm = new PopupWithForm(editAvatarPopup, (evt, getInputValues) => {
  evt.preventDefault();
  editAvatarBtn.textContent = 'Сохранение...';
  const {avatar} = getInputValues;
  api.postAvatarLink({
    avatar: avatar,
  })
    .then((data) => {
      userInfo.setUserInfo({avatar : data.avatar});
      popupAvatarForm.close();
    })
    .catch(err => console.log(err))
    .finally(() => {
      editAvatarBtn.textContent = 'Сохранить';
    })
});
popupAvatarForm.setEventListeners();

// Открытие формы редактирования профиля
editBtn.addEventListener('click', function() {
  formUserInfo.resetValidation();
  popupEditForm.open();
  const {name, about} = userInfo.getUserInfo();
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
  popupAddForm.open();
});


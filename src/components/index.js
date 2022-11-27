import '../pages/index.css';
import {profileName, profileDescription, inputName, inputDescription, editBtn, addBtn, formEdit, formAdd,
   formEditAvatar, editAvatar, profileAvatar, createBtn, editAvatarBtn, inputProfileAvatar, editProfileBtn,
   title, link, elements, cardTemplate, popupAvatarForm, popupEditForm, popupAddForm, formUserInfo, formUserAvatar, formAddCard, editFormPopup} from './variables.js';
import {api} from './api.js';
import {Card} from './card.js';
import {Section} from './section.js';
import {UserInfo} from './userInfo.js';
import {PopupWithForm} from './popupWithForm.js';

popupAvatarForm.setEventListeners();
popupEditForm.setEventListeners();
popupAddForm.setEventListeners();

const user = new UserInfo();

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
      const places = new Section({card, renderer}, '.elements');
      places.addItem(renderer);
    });
  })
  .catch(err => console.log(err))

  // Promise.all([api.getProfileInfo(), api.getInitialCards()])
  // .then(data => {
  //   profileName.textContent = data[0].name;
  //   profileDescription.textContent = data[0].about;
  //   profileAvatar.src = data[0].avatar;
  //   const items = data[1];
  //   items.reverse().forEach((item) => {
  //     const card = new Card(item, data[0]._id, cardTemplate);
  //     const renderer = card.createCard();
  //     const places = new Section({card, renderer}, '.elements');
  //     places.addItem(renderer);
  //   });
  // })
  // .catch(err => console.log(err))



// Форма редактирования профиля
const popupEditWithForm = new PopupWithForm(editFormPopup, handleProfileFormSubmit)

popupEditWithForm.setEventListeners()

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  editProfileBtn.textContent = 'Сохранение...';
  user.setUserInfo(inputName.value, inputDescription.value);
};

// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   editProfileBtn.textContent = 'Сохранение...';
//   api.postProfileInfo({
//     name: inputName.value,
//     about: inputDescription.value
//   })
//     .then(() => {
//       profileName.textContent = inputName.value;
//       profileDescription.textContent = inputDescription.value;
//       popupEditForm.close();
//     })
//     .catch(err => console.log(err))
//     .finally(() => {
//       editProfileBtn.textContent = 'Сохранить';
//     })
// };


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
  inputName.value = user.name;
  inputDescription.value = user.about;
});

// editBtn.addEventListener('click', function() {
//   popupEditForm.open();
//   inputName.value = profileName.textContent;
//   inputDescription.value = profileDescription.textContent;
// });



// Отправка формы редактирования профиля
// formEdit.addEventListener('submit', handleProfileFormSubmit);

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
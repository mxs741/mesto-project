import './pages/index.css';
// Открытие/закрытие формы редактирования
const editBtn = document.querySelector('.btn_type_edit');
const editFormPopup = document.querySelector('.popup_edit');
const inputName = document.querySelector('.form__input_name');
const profileName = document.querySelector('.profile__name');
const inputDescription = document.querySelector('.form__input_description');
const profileDescription = document.querySelector('.profile__description');
const closeButtons = document.querySelectorAll('.btn_type_close');
const title = document.querySelector('.form__input_type_name');
const link = document.querySelector('.form__input_type_link');
const addBtn = document.querySelector('.btn_type_add');
const addForm = document.querySelector('.popup_add');
const elements = document.querySelector('.elements');
const createBtn = document.querySelector('.form__btn_type_create');
const cardTemplate = document.querySelector('#element-template').content;
const formEdit = document.querySelector('.form__edit');
const formAdd = document.querySelector('.form__add');
const popup = document.querySelector('.popup_element');
const elemImgPopup = popup.querySelector('.element__img_size_full');
const elemImgPopupCaption = popup.querySelector('.element__img-caption');

const card = cardTemplate.querySelector('.element')
  const elemTitle = card.querySelector('.element__title');
  const elemImg = card.querySelector('.element__img');
  const likeBtn = card.querySelector('.btn_type_like');
  const deleteBtn = card.querySelector('.btn_type_remove-card');
  const cardElem = deleteBtn.closest('.element');


const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Открыть/закрыть попап
function openPopup(popup) {
  popup.classList.add('popup_opened')
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup))
})

// Редактировать профиль
editBtn.addEventListener('click', function() {
  openPopup(editFormPopup);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault()
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(editFormPopup);
}

formEdit.addEventListener('submit', handleProfileFormSubmit);


// Открытие формы добавления карточки
addBtn.addEventListener('click', () => openPopup(addForm));

// Создание карточки
function createCard(titleValue, linkValue) {
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  const elemTitle = card.querySelector('.element__title');
  const elemImg = card.querySelector('.element__img');
  const likeBtn = card.querySelector('.btn_type_like');
  const deleteBtn = card.querySelector('.btn_type_remove-card');
  const cardElem = deleteBtn.closest('.element');

  elemTitle.textContent = titleValue;
  elemImg.src = linkValue;
  elemImg.alt = titleValue;

  // Лайк карточки
  likeBtn.addEventListener('click', function(evt) {
    evt.target.classList.toggle('btn_type_like-active');
  });

  // Открытие попапа
  elemImg.addEventListener('click', () => {
    elemImgPopupCaption.textContent = titleValue;
    elemImgPopup.src = linkValue;
    elemImgPopup.alt = titleValue;
    openPopup(popup)
  });

  // Удаление карточки
  deleteBtn.addEventListener('click', function() {
  cardElem.remove();
  });

  return card
}

// Добавление карточки на страницу
function addCard() {
  elements.prepend(createCard(title.value, link.value));
}

function handleAddFormSubmit(evt) {
  evt.preventDefault()
  addCard(title.value, link.value);

  evt.target.reset()
  closePopup(addForm);
}

formAdd.addEventListener('submit', handleAddFormSubmit);

// 6 стандартных карточек
initialCards.forEach(function(item) {
  elements.append(createCard(item.name, item.link));
});

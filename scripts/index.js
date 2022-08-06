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

function formSubmitHandlerTypeEdit(evt) {
  evt.preventDefault()
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(editFormPopup);
}

formEdit.addEventListener('submit', formSubmitHandlerTypeEdit);


// Открытие формы добавления карточки
addBtn.addEventListener('click', () => openPopup(addForm));

// Создание карточки
function createCard(titleValue, linkValue) {
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  const popup = document.querySelector('.popup_element');

  card.querySelector('.element__title').textContent = titleValue;
  card.querySelector('.element__img').src = linkValue;
  card.querySelector('.element__img').alt = titleValue;

  // Лайк карточки
  card.querySelector('.btn_type_like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('btn_type_like-active');
  });

  // Открытие попапа
  card.querySelector('.element__img').addEventListener('click', () => {
    popup.querySelector('.element__img-caption').textContent = titleValue;
    popup.querySelector('.element__img_size_full').src = linkValue;
    popup.querySelector('.element__img_size_full').alt = titleValue;
    openPopup(popup)
  });

  // Удаление карточки
  const deleteBtn = card.querySelector('.btn_type_remove-card');
  deleteBtn.addEventListener('click', function() {
  const cardElem = deleteBtn.closest('.element');
  cardElem.remove();
  });

  return card
}

// Добавление карточки на страницу
function addCard() {
  elements.prepend(createCard(title.value, link.value));
}

function formSubmitHandlerTypeAdd(evt) {
  evt.preventDefault()
  addCard(title.value, link.value);

  title.value = '';
  link.value = '';
  closePopup(addForm);
}

formAdd.addEventListener('submit', formSubmitHandlerTypeAdd);

// 6 стандартных карточек
initialCards.forEach(function(item) {
  elements.append(createCard(item.name, item.link));
});

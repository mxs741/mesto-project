// Открытие/закрытие формы редактирования
const editBtn = document.querySelector('.btn_type_edit');
const closeBtn = document.querySelector('.btn_type_close-edit');
const editForm = document.querySelector('.popup_edit');
const inputName = document.querySelector('.form__input_name');
const profileName = document.querySelector('.profile__name');
const inputDescription = document.querySelector('.form__input_description');
const profileDescription = document.querySelector('.profile__description');

function openPopup(popup) {
  popup.classList.add('popup_opened')
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
}



editBtn.addEventListener('click', () => openPopup(editForm));

closeBtn.addEventListener('click', function() {
  closePopup(editForm);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

document.querySelector('.form__btn').addEventListener('click', function() {
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  closePopup(editForm);
});


// Открытие/закрытие формы добавления карточки
const addBtn = document.querySelector('.btn_type_add');
const addForm = document.querySelector('.popup_add');
const closeAddFormBtn = document.querySelector('.btn_type_close-add');

addBtn.addEventListener('click', () => openPopup(addForm));

closeAddFormBtn.addEventListener('click', () => closePopup(addForm));

// Добавление карточки
const elements = document.querySelector('.elements');
const createBtn = document.querySelector('.form__btn_type_create');
const cardTemplate = document.querySelector('#element-template').content;

function addCard(titleValue, linkValue) {
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  const popup = document.querySelector('.popup_element').cloneNode(true);

  card.querySelector('.element__title').textContent = titleValue;
  card.querySelector('.element__img').src = linkValue;
  popup.querySelector('.element__img-caption').textContent = titleValue;
  popup.querySelector('.element__img_size_full').src = linkValue;

  // Лайк карточки
  card.querySelector('.btn_type_like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('btn_type_like-active');
  });

  // Открытие попапа
  card.querySelector('.element__img').addEventListener('click', () => openPopup(popup));

  //Закрытие попапа
  popup.querySelector('.btn_type_close-img').addEventListener('click', () => closePopup(popup));

  elements.append(card);
  elements.append(popup);

  // Удаление карточки
  const deleteBtn = card.querySelector('.btn_type_remove-card');
  deleteBtn.addEventListener('click', function() {
  const cardElem = deleteBtn.closest('.element');
  cardElem.remove();
  });
}

createBtn.addEventListener('click', function() {
  const title = document.querySelector('.form__input_type_name');
  const link = document.querySelector('.form__input_type_link');
  addCard(title.value, link.value);

  title.value = '';
  link.value = '';
  closePopup(addForm);
});


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

initialCards.forEach(function(item) {
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  const popup = document.querySelector('.popup_element').cloneNode(true);
  card.querySelector('.element__title').textContent = item.name;
  card.querySelector('.element__img').src = item.link;
  popup.querySelector('.element__img-caption').textContent = item.name;
  popup.querySelector('.element__img_size_full').src = item.link;

  addCard(item.name, item.link);
});

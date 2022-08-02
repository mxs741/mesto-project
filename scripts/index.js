// Открытие/закрытие формы редактирования
const editBtn = document.querySelector('.btn_type_edit');
const closeBtn = document.querySelector('.form__close-btn');
const editForm = document.querySelector('.form_edit');
const formElement = document.querySelector('.form__edit');
const inputName = document.querySelector('.form__input_name');
const profileName = document.querySelector('.profile__name');
const inputDescription = document.querySelector('.form__input_description');
const profileDescription = document.querySelector('.profile__description');

editBtn.addEventListener('click', function() {
  editForm.classList.add('form_active');
});

closeBtn.addEventListener('click', function() {
  editForm.classList.remove('form_active');
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

document.querySelector('.form__btn').addEventListener('click', function() {
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;
  editForm.classList.remove('form_active');
});


// Открытие/закрытие формы добавления карточки
const addBtn = document.querySelector('.btn_type_add');
const addForm = document.querySelector('.form_add');
const closeAddFormBtn = document.querySelector('.form-add__close-btn');

addBtn.addEventListener('click', function() {
  addForm.classList.add('form_active');
});

closeAddFormBtn.addEventListener('click', function() {
  addForm.classList.remove('form_active');
});

// Добавление карточки
const elements = document.querySelector('.elements');
const createBtn = document.querySelector('.form__btn_type_create');
const cardTemplate = document.querySelector('#element-template').content;

function addCard(titleValue, linkValue) {
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  const popup = cardTemplate.querySelector('.element__popup').cloneNode(true);

  card.querySelector('.element__title').textContent = titleValue;
  card.querySelector('.element__img').src = linkValue;
  popup.querySelector('.element__img-caption').textContent = titleValue;
  popup.querySelector('.element__img_size_full').src = linkValue;

  // Лайк карточки
  card.querySelector('.btn_type_like').addEventListener('click', function(evt) {
    evt.target.classList.toggle('btn_type_like-active');
  });

  // Открытие попапа
  card.querySelector('.element__img').addEventListener('click', function() {
    popup.classList.add('element__popup_active');
  });

  //Закрытие попапа
  popup.querySelector('.element__popup-close-btn').addEventListener('click', function() {
    popup.classList.remove('element__popup_active');
  });
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
  addForm.classList.remove('form_active');
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
  const popup = cardTemplate.querySelector('.element__popup').cloneNode(true);
  card.querySelector('.element__title').textContent = item.name;
  card.querySelector('.element__img').src = item.link;
  popup.querySelector('.element__img-caption').textContent = item.name;
  popup.querySelector('.element__img_size_full').src = item.link;

  addCard(item.name, item.link);
});

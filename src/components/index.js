import '../pages/index.css';
import {handleProfileFormSubmit, handleAddFormSubmit, profileName, profileDescription, inputName, inputDescription, addForm, editFormPopup} from './modal.js';
import {openPopup} from './utils.js';
import enableValidation from './validate.js';

const editBtn = document.querySelector('.btn_type_edit');
const addBtn = document.querySelector('.btn_type_add');
const formEdit = document.querySelector('.form__edit');
const formAdd = document.querySelector('.form__add');


// Открытие формы редактирования профиля
editBtn.addEventListener('click', function() {
  openPopup(editFormPopup);
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
});

// Отправка формы редактирования профиля
formEdit.addEventListener('submit', handleProfileFormSubmit);

// Открытие формы добавления карточки
addBtn.addEventListener('click', () => openPopup(addForm));

// Отправка формы добавления карточки
formAdd.addEventListener('submit', handleAddFormSubmit);

// Включить валидацию
enableValidation();
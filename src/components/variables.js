import {PopupWithForm} from './popupWithForm.js';
import {PopupWithImage} from './popupWithImage.js';
import {FormValidator} from './formValidator.js';

export const addFormPopup = document.querySelector('.popup_add');
export const profileName = document.querySelector('.profile__name');
export const profileDescription = document.querySelector('.profile__description');
export const editFormPopup = document.querySelector('.popup_edit');
export const inputName = document.querySelector('.form__input_name');
export const inputDescription = document.querySelector('.form__input_description');
export const editBtn = document.querySelector('.btn_type_edit');
export const addBtn = document.querySelector('.btn_type_add');
export const createBtn = document.querySelector('.form__btn_type_create');
export const editAvatarBtn = document.querySelector('.form__btn_edit-avatar');
export const editProfileBtn = document.querySelector('.form__btn_edit-profile');
export const formEdit = document.querySelector('.form__edit');
export const formAdd = document.querySelector('.form__add');
export const formEditAvatar = document.querySelector('.form__edit-avatar');
export const editAvatarPopup = document.querySelector('.popup_edit-avatar');
export const editAvatar = document.querySelector('.profile__avatar-wrapper');
export const inputProfileAvatar = document.querySelector('.form__input-avatar-link');
export const profileAvatar = document.querySelector('.profile__avatar');
export const cfg = {
  url: 'https://mesto.nomoreparties.co/v1/plus-cohort-16/',
  headers: {
    authorization: 'c0fd3183-e813-469f-a9c4-cacdccd89151',
    'content-type': 'application/json',
  }
};
export const title = document.querySelector('.form__input_type_name');
export const link = document.querySelector('.form__input_type_link');
export const elements = document.querySelector('.elements');
export const cardTemplate = document.querySelector('#element-template').content;
export const imgPopup = document.querySelector('.popup_element');
export const elemImgPopup = imgPopup.querySelector('.element__img_size_full');
export const elemImgPopupCaption = imgPopup.querySelector('.element__img-caption');
export const popupAvatarForm = new PopupWithForm(editAvatarPopup);
export const popupEditForm = new PopupWithForm(editFormPopup);
export const popupAddForm = new PopupWithForm(addFormPopup);
export const popupImg = new PopupWithImage(imgPopup, elemImgPopupCaption, elemImgPopup);

// настройки валидации
export const settings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  btnSelector: '.form__btn',
  btnInactive: 'form__btn_inactive',
  formInputError: 'form__input_type_error',
  formErrorMessage: 'form__error-message_activate',
};

export const formUserInfo = new FormValidator(settings, '.form__edit');
export const formUserAvatar = new FormValidator(settings, '.form__edit-avatar');
export const formAddCard = new FormValidator(settings, '.form__add');


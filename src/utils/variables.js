export const formEdit = document.querySelector('.form__edit');
export const formAdd = document.querySelector('.form__add');
export const inputName = document.querySelector('.form__input_name');
export const inputDescription = document.querySelector('.form__input_description');
export const editBtn = document.querySelector('.btn_type_edit');
export const addBtn = document.querySelector('.btn_type_add');
export const editAvatar = document.querySelector('.profile__avatar-wrapper');
export const formEditAvatar = document.querySelector('.form__edit-avatar');
export const cardTemplate = document.querySelector('#element-template').content;
export const editAvatarPopup = document.querySelector('.popup_edit-avatar');
export const editFormPopup = document.querySelector('.popup_edit');
export const addFormPopup = document.querySelector('.popup_add');
export const imgPopup = document.querySelector('.popup_element');
export const elemImgPopupCaption = imgPopup.querySelector('.element__img-caption');
export const elemImgPopup = imgPopup.querySelector('.element__img_size_full');
export const cfg = {
  url: 'https://mesto.nomoreparties.co/v1/plus-cohort-16/',
  headers: {
    authorization: 'c0fd3183-e813-469f-a9c4-cacdccd89151',
    'content-type': 'application/json',
  }
};
export const settings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  btnSelector: '.form__btn',
  btnInactive: 'form__btn_inactive',
  formInputError: 'form__input_type_error',
  formErrorMessage: 'form__error-message_activate',
};

// export const profileName = document.querySelector('.profile__name');
// export const profileDescription = document.querySelector('.profile__description');
// export const createBtn = document.querySelector('.form__btn_type_create');
// export const editAvatarBtn = document.querySelector('.form__btn_edit-avatar');
// export const editProfileBtn = document.querySelector('.form__btn_edit-profile');
// export const profileAvatar = document.querySelector('.profile__avatar');
// export const inputProfileAvatar = document.querySelector('.form__input-avatar-link');
// export const title = document.querySelector('.form__input_type_name');
// export const link = document.querySelector('.form__input_type_link');
// export const elements = document.querySelector('.elements');
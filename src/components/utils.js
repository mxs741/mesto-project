import {closePopupWithEscKey, closePopupClickingOutside} from './modal.js';

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWithEscKey);
  closePopupClickingOutside();
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEscKey);
};

export {openPopup, closePopup};
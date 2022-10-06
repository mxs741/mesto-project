const closeButtons = document.querySelectorAll('.btn_type_close');

// Закрытие попапа на 'Escape'
function closePopupWithEscKey(evt) {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  };
};

// Закрытие попапа по щелчку за пределами формы
function closePopupClickingOutside() {
    const popupOpenedArr = Array.from(document.querySelectorAll('.popup'));
    popupOpenedArr.forEach((popup) => {
      popup.addEventListener('click', (evt) => {
        evt.target.classList.remove('popup_opened');
    });
  });
};

// Кнопки закрытия попапов
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupWithEscKey);
};

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupWithEscKey);
};

export {openPopup, closePopup, closePopupClickingOutside};
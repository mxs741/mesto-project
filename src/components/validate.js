function showErrorMessage(form, input, errorMessage) {
  const inputError = form.querySelector(`.${input.id}-error`);
  input.classList.add('form__input_type_error');
  inputError.classList.add('form__error-message_activate');
  inputError.textContent = errorMessage;
};

function removeErrorMessage(form, input) {
  const inputError = form.querySelector(`.${input.id}-error`);
  input.classList.remove('form__input_type_error');
  inputError.classList.remove('form__error-message_activate');
  inputError.textContent = ''
};

function checkValidity(form, input) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('');
  };

  if (!input.validity.valid) {
    showErrorMessage(form, input, input.validationMessage);
  } else {
    removeErrorMessage(form, input);
  };
};

function setEventListeners(form) {
  const inputList = Array.from(form.querySelectorAll('.form__input'));
  const button = form.querySelector('.form__btn');
  toggleButtonState(inputList, button);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkValidity(form, input);
      toggleButtonState(inputList, button);
    });
  });
};

function enableValidation() {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((form) => {
    setEventListeners(form);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

function toggleButtonState(inputList, button) {
  if (hasInvalidInput(inputList)) {
    button.disabled = true;
    button.classList.add('form__btn_inactive');
  } else {
    button.disabled = false;
    button.classList.remove('form__btn_inactive');
  };
};

export default enableValidation;
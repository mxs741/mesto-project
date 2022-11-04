function showErrorMessage(form, input, errorMessage, set) {
  const inputError = form.querySelector(`.${input.id}-error`);
  input.classList.add(set.formInputError);
  inputError.classList.add(set.formErrorMessage);
  inputError.textContent = errorMessage;
};

function removeErrorMessage(form, input, set) {
  const inputError = form.querySelector(`.${input.id}-error`);
  input.classList.remove(set.formInputError);
  inputError.classList.remove(set.formErrorMessage);
  inputError.textContent = ''
};

function checkValidity(form, input, set) {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity('');
  };

  if (!input.validity.valid) {
    showErrorMessage(form, input, input.validationMessage, set);
  } else {
    removeErrorMessage(form, input, set);
  };
};

function setEventListeners(form, set) {
  const inputList = Array.from(form.querySelectorAll(set.inputSelector));
  const button = form.querySelector(set.btnSelector);
  toggleButtonState(inputList, button, set);
  inputList.forEach((input) => {
    input.addEventListener('input', () => {
      checkValidity(form, input, set);
      toggleButtonState(inputList, button, set);
    });
  });
};

function enableValidation(set) {
  const formList = Array.from(document.querySelectorAll(set.formSelector));
  formList.forEach((form) => {
    setEventListeners(form, set);
  });
};

function hasInvalidInput(inputList) {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

function toggleButtonState(inputList, button, set) {
  if (hasInvalidInput(inputList)) {
    button.disabled = true;
    button.classList.add(set.btnInactive);
  } else {
    button.disabled = false;
    button.classList.remove(set.btnInactive);
  };
};

export default enableValidation;
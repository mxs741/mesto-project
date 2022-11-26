export class FormValidator {
  constructor(settings, formElement) {
      this._form = document.querySelector(formElement);      
      this._inputList = Array.from(this._form.querySelectorAll(settings.inputSelector));
      this._btnSubmitElement = this._form.querySelector(settings.btnSelector);
      this._btnSubmitDisabledClass = settings.btnInactive;
      this._formInputErrorClass = settings.formInputError;
      this._formErrorMessageClass = settings.formErrorMessage;
    } 

  enableValidation() {
    this._setEventListeners();
  };

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkValidity(input);
        this._toggleButtonState();
      });
    });
  };

  _showErrorMessage(input, errorMessage) {
    this._inputError = this._form.querySelector(`.${input.id}-error`);
    input.classList.add(this._formInputErrorClass);
    this._inputError.classList.add(this._formErrorMessageClass);
    this._inputError.textContent = errorMessage;
  };

  _removeErrorMessage(input) {
    this._inputError = this._form.querySelector(`.${input.id}-error`);
    input.classList.remove(this._formInputErrorClass);
    this._inputError.classList.remove(this._formErrorMessageClass);
    this._inputError.textContent = '';
  };

  _checkValidity(input) {
    if (input.validity.patternMismatch) {
      input.setCustomValidity(input.dataset.errorMessage);
    } else {
      input.setCustomValidity('');
    };

    if (!input.validity.valid) {
      this._showErrorMessage(input, input.validationMessage);
    } else {
      this._removeErrorMessage(input);
    };
  };

  _hasInvalidInput() {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this._btnSubmitElement.disabled = true;
      this._btnSubmitElement.classList.add(this._btnSubmitDisabledClass);
    } else {
      this._btnSubmitElement.disabled = false;
      this._btnSubmitElement.classList.remove(this._btnSubmitDisabledClass);
    };
  };
}
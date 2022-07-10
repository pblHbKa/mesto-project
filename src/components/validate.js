let classInputTypeError, classInputErrorActive, submitButtonSelector, inputSelector, inactiveButtonClass;

function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(classInputTypeError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(classInputErrorActive);
};

function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(classInputTypeError);
  errorElement.classList.remove(classInputErrorActive);
  errorElement.textContent = '';
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

function validateForm(formElement) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement);
  });
  toggleButtonState(inputList, buttonElement);
};

function enableValidation(selectors) {
  classInputTypeError = selectors.inputErrorClass;
  classInputErrorActive = selectors.errorClass;
  submitButtonSelector = selectors.submitButtonSelector;
  inputSelector = selectors.inputSelector;
  inactiveButtonClass = selectors.inactiveButtonClass;

  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  });
};

export {enableValidation, validateForm};

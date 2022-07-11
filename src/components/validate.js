let  inactiveButtonClass;

function showInputError(formElement, inputElement, errorMessage, classInputTypeError, classInputErrorActive) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(classInputTypeError);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(classInputErrorActive);
};

function hideInputError(formElement, inputElement, classInputTypeError, classInputErrorActive) {
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

function toggleButtonState(inputList, buttonElement, inactiveButtonClass) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
  }
};

function checkInputValidity(formElement, inputElement, classInputTypeError, classInputErrorActive) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, classInputTypeError, classInputErrorActive);
  } else {
    hideInputError(formElement, inputElement, classInputTypeError, classInputErrorActive);
  }
};

function enableValidation(selectors) {
  const formList = Array.from(document.querySelectorAll(selectors.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement, selectors.inputErrorClass, selectors.errorClass);
        toggleButtonState(inputList, buttonElement, selectors.inactiveButtonClass);
      });
    });
  });
};

export { enableValidation };

import './styles/index.css';
import * as modal from './components/modal.js';
import * as card from './components/card.js';
import * as validate from './components/validate.js';
import * as profile from './components/profile.js'

document.querySelector('#edit-button').addEventListener('click', modal.openProfilePopup);
document.querySelector('#add-button').addEventListener('click', modal.openCardPopup);

validate.enableValidation({
  formSelector: '.form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.button_save',
  inactiveButtonClass: 'button_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'form__input-error_active'
});

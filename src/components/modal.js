import {addCard} from './card.js';
import {disabledButton} from './utils.js';

const profileEdit = document.querySelector('.popup-form');
const nameInput = document.querySelector('#edit-profile__name');
const descriptionInput = document.querySelector('#edit-profile__description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileForm = document.querySelector('.edit-profile');
const newCard = document.querySelector('.popup-new-card');
const newCardForm = document.querySelector('.new-card-form');
const imageView = document.querySelector('.popup-image');
const imageViewName = imageView.querySelector('.popup-image__name');
const imageViewImage = imageView.querySelector('.popup-image__image');
const nameCardInput = document.querySelector('#new-card__name');
const srcCardInput = document.querySelector('#new-card__src');
const popups = document.querySelectorAll('.popup');

profileForm.addEventListener('submit', handleProfileFormSubmit);
newCardForm.addEventListener('submit', handleNewCardFormSubmit);

function openPopup(popup) {
  popup.classList.add('popup_opened');

  popup.addEventListener('mousedown', handleOverlay);
  document.addEventListener('keydown', handleEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');

  popup.removeEventListener('mousedown', handleOverlay);
  document.removeEventListener('keydown', handleEscape);
}

function openProfilePopup(evt) {
  openPopup(profileEdit);

  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  disabledButton(profileForm.querySelector('.button_save'), 'button_inactive');
}

function openCardPopup(evt) {
  openPopup(newCard);

  newCardForm.reset();
  disabledButton(newCardForm.querySelector('.button_save'), 'button_inactive');
}

function openImagePopUp(src, name) {
  openPopup(imageView);

  imageViewName.textContent = name;
  imageViewImage.src = src;
  imageViewImage.alt = name;
}

function handleOverlay(evt) {
  if(evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  }
};

function handleEscape(evt) {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closePopup(profileEdit);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  if (nameCardInput.value !== '' && srcCardInput.value !== '') {
    addCard(nameCardInput.value, srcCardInput.value);
    closePopup(newCard);
  }
}

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
});

export {openProfilePopup, openCardPopup, handleProfileFormSubmit, handleNewCardFormSubmit, openImagePopUp};

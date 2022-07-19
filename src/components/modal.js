import { newCard } from './card.js';
import { disabledButton } from './utils.js';
import { saveProfileInfo, setNewAvatar } from './profile.js';

const profileEdit = document.querySelector('.popup-form');
const nameInput = document.querySelector('#edit-profile__name');
const descriptionInput = document.querySelector('#edit-profile__description');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const profileForm = document.querySelector('.edit-profile');
const newCardPopup = document.querySelector('.popup-new-card');
const newCardForm = document.querySelector('.new-card-form');
const imageView = document.querySelector('.popup-image');
const imageViewName = imageView.querySelector('.popup-image__name');
const imageViewImage = imageView.querySelector('.popup-image__image');
const nameCardInput = document.querySelector('#new-card__name');
const srcCardInput = document.querySelector('#new-card__src');
const popups = document.querySelectorAll('.popup');
const avatarPopup = document.querySelector('.popup-avatar');
const avatarForm = document.querySelector('.avatar-form');
const avatarNewImg = avatarForm.querySelector('#avatar__src');

profileForm.addEventListener('submit', handleProfileFormSubmit);
newCardForm.addEventListener('submit', handleNewCardFormSubmit);
avatarForm.addEventListener('submit', handleAvatarFormSubmit)

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
  openPopup(newCardPopup);

  newCardForm.reset();
  disabledButton(newCardForm.querySelector('.button_save'), 'button_inactive');
}

function openAvatarPopup(evt) {
  openPopup(avatarPopup);

  avatarForm.reset();
  disabledButton(avatarForm.querySelector('.button_save'), 'button_inactive');
}

function openImagePopUp(src, name) {
  openPopup(imageView);

  imageViewName.textContent = name;
  imageViewImage.src = src;
  imageViewImage.alt = name;
}

function handleOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
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
  saveProfileInfo(nameInput.value, descriptionInput.value, profileForm.querySelector('#edit-profile__save'), profileEdit);
}

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();
  newCard(nameCardInput.value, srcCardInput.value, newCardForm.querySelector('#new-card__save'), newCardPopup);
}

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  setNewAvatar(avatarNewImg.value, avatarForm.querySelector('#avatar__save'), avatarPopup);
}

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
});

export { openProfilePopup, openCardPopup, openAvatarPopup, handleProfileFormSubmit, handleNewCardFormSubmit, openImagePopUp, closePopup };

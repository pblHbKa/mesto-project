import './styles/index.css';

import Eysk from './images/Eysk.jpg';
import Nikolalenivets from './images/Nikola-lenivets.jpg';
import Ergaki from './images/Ergaki.jpg';
import Pushino from './images/Pushino.jpg';
import Tomsk from './images/Tomsk.jpg';
import Sheregesh from './images/Sheregesh.jpg';

const profileEdit = document.querySelector('.popup-form');
const newCard = document.querySelector('.popup-new-card');
const imageView = document.querySelector('.popup-image');
const profileForm = document.querySelector('.edit-profile');
const newCardForm = document.querySelector('.new-card-form');
const nameInput = document.querySelector('#edit-profile__name');
const descriptionInput = document.querySelector('#edit-profile__description');
const nameCardInput = document.querySelector('#new-card__name');
const srcCardInput = document.querySelector('#new-card__src');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const cardTemplate = document.querySelector('#photo-card').content;
const sectionPhoto = document.querySelector('.photos');
const popups = document.querySelectorAll('.popup');
const imageViewName = imageView.querySelector('.popup-image__name');
const imageViewImage = imageView.querySelector('.popup-image__image');

const initialCards = [
  {
    name: 'Шерегеш',
    link: Sheregesh
  },
  {
    name: 'Ейск',
    link: Eysk
  },
  {
    name: 'Никола-Ленивец',
    link: Nikolalenivets
  },
  {
    name: 'Ергаки',
    link: Ergaki
  },
  {
    name: 'Пущино',
    link: Pushino
  },
  {
    name: 'Томск',
    link: Tomsk
  }
];

document.querySelector('#edit-button').addEventListener('click', openProfilePopup);
document.querySelector('#add-button').addEventListener('click', openCardPopup);
profileForm.addEventListener('submit', handleProfileFormSubmit);
newCardForm.addEventListener('submit', handleNewCardFormSubmit);
document.addEventListener('click', chekOpenPopup);
document.addEventListener('keydown', chekOpenPopup);

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
}

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

function openProfilePopup(evt) {
  openPopup(profileEdit);

  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
  validateForm(profileForm);
}

function openCardPopup(evt) {
  openPopup(newCard);

  newCardForm.reset();
  validateForm(newCardForm);
}

function openImagePopUp(evt) {
  openPopup(imageView);

  imageViewName.textContent = evt.target.closest('.photo-card').querySelector('.photo-card__name').textContent;
  imageViewImage.src = evt.target.src;
  imageViewImage.alt = imageViewName.textContent;
}

function addCard(name, src) {
  const photoCard = createCard(name, src);
  sectionPhoto.prepend(photoCard);
}

function createCard(name, src) {
  const photoCard = cardTemplate.querySelector('.photo-card').cloneNode(true);
  const photoCardImg = photoCard.querySelector('.photo-card__img');

  photoCard.querySelector('.photo-card__name').textContent = name;
  photoCardImg.src = src;
  photoCardImg.alt = name;

  photoCard.querySelector('.photo-card__like').addEventListener('click', likePhoto);
  photoCard.querySelector('.photo-card__delete').addEventListener('click', deletePhoto);
  photoCardImg.addEventListener('click', openImagePopUp);

  return photoCard;
}

function likePhoto(evt) {
  evt.target.classList.toggle('photo-card__like_active');
}

function deletePhoto(evt) {
  evt.target.closest('.photo-card').remove();
}

initialCards.forEach(elem => { addCard(elem.name, elem.link) });

popups.forEach((popup) => {
  popup.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
});

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove('popup__input_type_error');
  errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add('button_inactive');
  } else {
    buttonElement.classList.remove('button_inactive');
  }
};

const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const validateForm = (formElement) => {
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.button_save');
  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement);
  });
  toggleButtonState(inputList, buttonElement);
};

const setValidation = () => {
  const formList = Array.from(document.querySelectorAll('.form'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });

    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector('.button_save');
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  });
};

function chekOpenPopup(evt) {
  if(evt.type === 'click' && evt.target.classList.contains('popup')) {
    closePopup(evt.target);
  } else if (evt.type === 'keydown' && evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}

setValidation();

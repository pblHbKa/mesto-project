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
    link: './images/Sheregesh.jpg'
  },
  {
    name: 'Ейск',
    link: './images/Eysk.jpg'
  },
  {
    name: 'Никола-Ленивец',
    link: './images/Nikola-lenivets.jpg'
  },
  {
    name: 'Ергаки',
    link: './images/Ergaki.jpg'
  },
  {
    name: 'Пущино',
    link: './images/Pushino.jpg'
  },
  {
    name: 'Томск',
    link: './images/Tomsk.jpg'
  }
];

document.querySelector('#edit-button').addEventListener('click', openProfilePopup);
document.querySelector('#add-button').addEventListener('click', openCardPopup);
profileForm.addEventListener('submit', handleProfileFormSubmit);
newCardForm.addEventListener('submit', handleNewCardFormSubmit);

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
}

function openCardPopup(evt) {
  openPopup(newCard);
  newCardForm.reset();
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

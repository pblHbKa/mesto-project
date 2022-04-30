const profileEdit = document.querySelector('.popup-form');
const newCard = document.querySelector('.popup-new-card');
const imageView = document.querySelector('.popup-image');
const formElement = document.querySelector('.edit-profile');
const nameInput = document.querySelector('#edit-profile__name');
const descriptionInput = document.querySelector('#edit-profile__description');
const nameCardInput = document.querySelector('#new-card__name');
const srcCardInput = document.querySelector('#new-card__src');
const formTitle = document.querySelector('.edit-profile__title');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const cardTemplate = document.querySelector('#photo-card').content;
const sectionPhoto = document.querySelector('.photos');

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

document.querySelector('#edit-button').addEventListener('click', openPopUp);
document.querySelector('#add-button').addEventListener('click', openPopUpCard);
document.querySelector('#edit-profile__close').addEventListener('click', closePopUp);
document.querySelector('#new-card__close').addEventListener('click', closeCardPopUp);
document.querySelector('#popup-image__close').addEventListener('click', evt => { imageView.classList.remove('popup_opened') });
document.querySelector('#new-card__save').addEventListener('click', evt => {
  if (nameCardInput.value !== '' && srcCardInput.value !== '') {
    addCard(nameCardInput.value, srcCardInput.value);
    closeCardPopUp();
  }
});
formElement.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileDescription.textContent = descriptionInput.value;

  closePopUp();
}

function openPopUp(evt) {
  profileEdit.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function closeCardPopUp() {
  newCard.classList.remove('popup_opened');
}

function closePopUp() {
  profileEdit.classList.remove('popup_opened')
}

function openPopUpCard(evt) {
  newCard.classList.add('popup_opened');
  nameCardInput.value = '';
  srcCardInput.value = '';
}

function openImagePopUp(evt) {
  imageView.classList.add('popup_opened');

  imageView.querySelector('.popup-image__name').textContent = evt.target.closest('.photo-card').querySelector('.photo-card__name').textContent;
  imageView.querySelector('.popup-image__image').src = evt.target.src;

}

function addCard(name, src) {
  const photoCard = cardTemplate.querySelector('.photo-card').cloneNode(true);

  photoCard.querySelector('.photo-card__name').textContent = name;
  photoCard.querySelector('.photo-card__img').src = src;

  photoCard.querySelector('.photo-card__like').addEventListener('click', likePhoto);
  photoCard.querySelector('.photo-card__delete').addEventListener('click', deletePhoto);
  photoCard.querySelector('.photo-card__img').addEventListener('click', openImagePopUp);

  sectionPhoto.prepend(photoCard);
}

function likePhoto(evt) {
  evt.target.classList.toggle('photo-card__like_active');
}

function deletePhoto(evt) {
  evt.target.closest('.photo-card').remove();
}

initialCards.forEach(elem => { addCard(elem.name, elem.link) });


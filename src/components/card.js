import { openImagePopUp } from './modal.js';
import { getInitialCards, addCard as addCardAPI, likeCard, unlikeCard, deleteCard } from './api.js';
import { idProfile } from './profile.js';

const sectionPhoto = document.querySelector('.photos');
const cardTemplate = document.querySelector('#photo-card').content;

function newCard(name, src) {
  addCardAPI(name, src)
    .then(res => {
      addCard(name, src, res._id, res.owner._id);
    })
}

function addCard(name, src, cardId, ownerId, likes = []) {
  const photoCard = createCard(name, src, cardId, ownerId, likes);
  sectionPhoto.prepend(photoCard);
}

function createCard(name, src, cardId, ownerId, likes) {
  const photoCard = cardTemplate.querySelector('.photo-card').cloneNode(true);
  const photoCardImg = photoCard.querySelector('.photo-card__img');
  const likeNumber = photoCard.querySelector('.photo-card__like-number');
  const likeButton = photoCard.querySelector('.photo-card__like');
  const deleteButton = photoCard.querySelector('.photo-card__delete');

  photoCard.querySelector('.photo-card__name').textContent = name;
  photoCardImg.src = src;
  photoCardImg.alt = name;
  likeNumber.textContent = likes.length;

  if (likes.some(elem => elem._id === idProfile)) {
    likeButton.classList.add('photo-card__like_active');
  }

  likeButton.addEventListener('click', () => { likePhoto(likeButton, 'photo-card__like_active', cardId, likeNumber) });
  if (ownerId === idProfile) {
    deleteButton.addEventListener('click', () => { deletePhoto(photoCard, cardId) });
  } else {
    deleteButton.remove();
  }
  photoCardImg.addEventListener('click', (evt) => { openImagePopUp(evt.target.src, evt.target.closest('.photo-card').querySelector('.photo-card__name').textContent) });

  return photoCard;
}

function likePhoto(likeButton, activeClass, cardId, likeNumber) {
  if (likeButton.classList.contains(activeClass)) {
    unlikeCard(cardId)
      .then(res => {
        likeButton.classList.remove(activeClass);
        likeNumber.textContent = res.likes.length;
      })
  } else {
    likeCard(cardId)
      .then(res => {
        likeButton.classList.add(activeClass);
        likeNumber.textContent = res.likes.length;
      });
  }
}

function deletePhoto(photoCard, cardId) {
  deleteCard(cardId)
    .then(() => {
      photoCard.remove();
    })
}

getInitialCards()
  .then((res) => {
    res.forEach(elem => { addCard(elem.name, elem.link, elem._id, elem.owner._id, elem.likes) });
  });

export { newCard };

import Eysk from '../images/Eysk.jpg';
import Nikolalenivets from '../images/Nikola-lenivets.jpg';
import Ergaki from '../images/Ergaki.jpg';
import Pushino from '../images/Pushino.jpg';
import Tomsk from '../images/Tomsk.jpg';
import Sheregesh from '../images/Sheregesh.jpg';
import {openImagePopUp} from './modal.js'

const sectionPhoto = document.querySelector('.photos');
const cardTemplate = document.querySelector('#photo-card').content;

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
  photoCardImg.addEventListener('click', (evt) => {openImagePopUp(evt.target.src, evt.target.closest('.photo-card').querySelector('.photo-card__name').textContent)});

  return photoCard;
}

function likePhoto(evt) {
  evt.target.classList.toggle('photo-card__like_active');
}

function deletePhoto(evt) {
  evt.target.closest('.photo-card').remove();
}

initialCards.forEach(elem => { addCard(elem.name, elem.link) });

export {addCard};

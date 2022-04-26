const profileEdit = document.querySelector('.popup');
const formElement = document.querySelector('.edit-profile');
const nameInput = document.querySelector('#edit-profile__name');
const descriptionInput = document.querySelector('#edit-profile__description');
const formTitle = document.querySelector('.edit-profile__title');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__description');
const cardTemplate = document.querySelector('#photo-card').content;
const sectionPhoto = document.querySelector('.photos');

const initialCards = [
  {
    name: 'Шерегеш',
    link: '../images/Sheregesh.jpg'
  },
  {
    name: 'Ейск',
    link: '../images/Eysk.jpg'
  },
  {
    name: 'Никола-Ленивец',
    link: '../images/Nikola-lenivets.jpg'
  },
  {
    name: 'Ергаки',
    link: '../images/Ergaki.jpg'
  },
  {
    name: 'Пущино',
    link: '../images/Pushino.jpg'
  },
  {
    name: 'Томск',
    link: '../images/Tomsk.jpg'
  }
];

document.querySelector('#edit-button').addEventListener('click', openPopUp);
document.querySelector('#add-button').addEventListener('click', openPopUpCard);
document.querySelector('.edit-profile__close').addEventListener('click', closePopUp);
formElement.addEventListener('submit', formSubmitHandler);

function formSubmitHandler(evt) {
  evt.preventDefault();

  if (formElement.classList.contains('add-card')) {
    if (nameInput.value === '' || descriptionInput.value === '') {
      return
    }
    addCard(nameInput.value, descriptionInput.value);
  } else {
    profileName.textContent = nameInput.value;
    profileDescription.textContent = descriptionInput.value;
  }
  closePopUp();
}

function openPopUp(evt) {
  profileEdit.classList.add('popup_opened');
  formElement.classList.remove('add-card');
  formTitle.textContent = 'Редактировать профиль';

  nameInput.placeholder = 'Введите ваше имя';
  descriptionInput.placeholder = 'Несколько слов о себе';
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function openPopUpCard(evt) {
  profileEdit.classList.add('popup_opened');
  formElement.classList.add('add-card');
  formTitle.textContent = 'Новое место';

  nameInput.placeholder = 'Название';
  descriptionInput.placeholder = 'Ссылка на картинку';
  nameInput.value = '';
  descriptionInput.value = '';
}

function closePopUp(evt) {
  profileEdit.classList.remove('popup_opened');
}

function addCard(name, src) {
  const photoCard = cardTemplate.querySelector('.photo-card').cloneNode(true);
  photoCard.querySelector('.photo-card__name').textContent = name;
  photoCard.querySelector('.photo-card__img').src = src;
  photoCard.querySelector('.photo-card__like').addEventListener('click', likePhoto);
  sectionPhoto.prepend(photoCard);
}

function likePhoto(evt) {
  evt.target.classList.toggle('photo-card__like_active');
}

initialCards.forEach(elem => { addCard(elem.name, elem.link) });


import { updateProfileInfo, updateAvatar } from './api.js';
import { openAvatarPopup, closePopup } from './modal.js';

const name = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const avatar = document.querySelector('.avatar');
const avatarImg = avatar.querySelector('.avatar__img');

avatar.addEventListener('click', openAvatarPopup);

function saveProfileInfo(newName, newDescription, buttonSave, profileEdit) {
  buttonSave.textContent = "Сохранение...";

  updateProfileInfo(newName, newDescription)
    .then(res => {
      setProfileData(res.name, res.about);
      closePopup(profileEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {buttonSave.textContent = "Сохранить";})
}

function setNewAvatar(img, buttonSave, avatarPopup) {
  buttonSave.textContent = "Сохранение...";

  updateAvatar(img)
  .then(res => {
    setAvatarImg(res.avatar);
    closePopup(avatarPopup);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {buttonSave.textContent = "Сохранить";})
}

function setAvatarImg(url) {
  avatarImg.src = url;
}

function setProfileData(nameProfile, aboutProfile) {
  name.textContent = nameProfile;
  description.textContent = aboutProfile;
}

export { saveProfileInfo, setNewAvatar, setProfileData, setAvatarImg };

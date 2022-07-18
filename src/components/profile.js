import { getProfileInfo, updateProfileInfo, updateAvatar } from './api.js';
import { openAvatarPopup } from './modal.js';

const name = document.querySelector('.profile__name');
const description = document.querySelector('.profile__description');
const avatar = document.querySelector('.avatar');
const avatarImg = avatar.querySelector('.avatar__img');
let idProfile;

avatar.addEventListener('click', openAvatarPopup);

function saveProfileInfo(newName, newDescription) {
  updateProfileInfo(newName, newDescription)
    .then(res => {
      setProfileData(res.name, res.about);
    })
}

function setNewAvatar(img) {
  updateAvatar(img)
  .then(res => {
    setAvatarImg(res.avatar);
  });
}

getProfileInfo()
  .then((res) => {
    setProfileData(res.name, res.about);
    setAvatarImg(res.avatar);
    idProfile = res._id;
  });


function setAvatarImg(url) {
  avatarImg.src = url;
}

function setProfileData(nameProfile, aboutProfile) {
  name.textContent = nameProfile;
  description.textContent = aboutProfile;
}

export { saveProfileInfo, idProfile, setNewAvatar };

import '../pages/index.css';
import { createCard, handleLike } from './card.js';
import { openPopup, closePopup } from './modal.js';
import { enableValidation, clearValidation } from './validation.js';
import {
  getProfileInfo,
  getCards,
  setProfileInfo,
  setAvatar,
  createPost,
  deletePost,
} from './api.js';

// Валидация форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
};

enableValidation(validationConfig);

// Функция вывода карточки на страницу
function renderCard(cardData) {
  const cardList = document.querySelector('.places__list');
  const newCard = createCard(
    cardData,
    openConfirmPopup,
    handleLike,
    openLargeImg,
    userId
  );
  cardList.prepend(newCard);
}

// Выводим данные пользователя и карточки с сервера
let userId;

Promise.all([getProfileInfo(), getCards()])
  .then(([userData, cards]) => {
    profileImage.style.backgroundImage = `url('${userData.avatar}')`;
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    userId = userData['_id'];
    cards.reverse().forEach((card) => {
      renderCard(card);
    });
  })
  .catch((err) => {
    console.log('Запрос не выполнен.', err);
  });

// Плавное открытие и закрытие попапов
const popups = document.querySelectorAll('.popup');

popups.forEach((popup) => {
  popup.classList.add('popup_is-animated');
});

// Функция открытия попапа изображения карточки
const popupTypeImg = document.querySelector('.popup_type_image');
const popupImg = popupTypeImg.querySelector('.popup__image');
const popupImgCaption = popupTypeImg.querySelector('.popup__caption');

function openLargeImg(cardData) {
  popupImg.src = cardData.link;
  popupImg.alt = cardData.name + '.';
  popupImgCaption.textContent = cardData.name;
  openPopup(popupTypeImg);
}

// Удаление карточки
const popupConfirm = document.querySelector('.popup__type_confirm');
const formConfirm = popupConfirm.querySelector('.popup__form');

function openConfirmPopup(cardId) {
  popupConfirm.id = cardId;
  openPopup(popupConfirm);
}

function deleteCard(event) {
  event.preventDefault();

  const cardId = popupConfirm.id;
  deletePost(cardId)
    .then(() => {
      const cardElement = document.querySelector(`[id='${cardId}']`);
      cardElement.remove();
      closePopup(popupConfirm);
    })
    .catch((err) => {
      console.log('Запрос не выполнен.', err);
    });
}

formConfirm.addEventListener('submit', deleteCard);

// Добавление новой карточки
const buttonAddCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const formAddCard = popupAddCard.querySelector('.popup__form');
const placeNameInput = popupAddCard.querySelector(
  '.popup__input_type_card-name'
);
const placeLinkInput = popupAddCard.querySelector('.popup__input_type_url');
const addCardSubmitButton = popupAddCard.querySelector('.popup__button');

buttonAddCard.addEventListener('click', () => {
  formAddCard.reset();
  clearValidation(formAddCard, validationConfig);
  openPopup(popupAddCard);
});

function addCard(event) {
  event.preventDefault();
  showLoading(addCardSubmitButton);

  const newPlace = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };

  createPost(newPlace.name, newPlace.link)
    .then((data) => {
      renderCard(data);
      closePopup(popupAddCard);
    })
    .catch((err) => {
      console.log('Запрос не выполнен.', err);
    })
    .finally(() => {
      hideLoading(addCardSubmitButton);
    });
}

formAddCard.addEventListener('submit', addCard);

// Редактирование профиля
const buttonProfileEdit = document.querySelector('.profile__edit-button');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const formProfileEdit = popupProfileEdit.querySelector('.popup__form');
const nameInput = popupProfileEdit.querySelector('.popup__input_type_name');
const jobInput = popupProfileEdit.querySelector(
  '.popup__input_type_description'
);
const profileSubmitButton = popupProfileEdit.querySelector('.popup__button');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__description');

buttonProfileEdit.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(formProfileEdit, validationConfig);
  openPopup(popupProfileEdit);
});

function editProfile(event) {
  event.preventDefault();
  showLoading(profileSubmitButton);

  setProfileInfo(nameInput.value, jobInput.value)
    .then((data) => {
      profileName.textContent = data.name;
      profileJob.textContent = data.about;
      closePopup(popupProfileEdit);
    })
    .catch((err) => {
      console.log('Запрос не выполнен.', err);
    })
    .finally(() => {
      hideLoading(profileSubmitButton);
    });

  formProfileEdit.reset();
}

formProfileEdit.addEventListener('submit', editProfile);

// Редактирование аватара
const profileImage = document.querySelector('.profile__image');
const popupAvatar = document.querySelector('.popup_type_avatar');
const formAvatar = popupAvatar.querySelector('.popup__form');
const avatarUrlInput = popupAvatar.querySelector('.popup__input_type_avatar');
const avatarSubmitButton = popupAvatar.querySelector('.popup__button');

profileImage.addEventListener('click', () => {
  formAvatar.reset();
  clearValidation(formAvatar, validationConfig);
  openPopup(popupAvatar);
});

function editAvatar(event) {
  event.preventDefault();
  showLoading(avatarSubmitButton);

  setAvatar(avatarUrlInput.value)
    .then((data) => {
      profileImage.style.backgroundImage = `url('${data.avatar}')`;
      closePopup(popupAvatar);
    })
    .catch((err) => {
      console.log('Запрос не выполнен.', err);
    })
    .finally(() => {
      hideLoading(avatarSubmitButton);
    });
}

formAvatar.addEventListener('submit', editAvatar);

// Загрузка
function showLoading(saveButton) {
  saveButton.textContent = 'Сохранение...';
  saveButton.setAttribute('disabled', 'true');
}

function hideLoading(saveButton) {
  saveButton.textContent = 'Сохранить';
  saveButton.removeAttribute('disabled');
}

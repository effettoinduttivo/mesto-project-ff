import "../pages/index.css";
import { initialCards } from "./cards.js";
import { createCard, deleteCard, toggleLike } from "./card.js";
import { openPopup, closePopup } from "./modal.js";
import { enableValidation, clearValidation } from "./validation.js";

// Список карточек
const cardList = document.querySelector(".places__list");

// Функция вывода карточки на страницу
function renderCard(cardData) {
  const newCard = createCard(cardData, deleteCard, toggleLike, openLargeImg);
  cardList.prepend(newCard);
}

// Вывод начальных карточек
initialCards.forEach(renderCard);

// Константы для попапов
const popups = document.querySelectorAll(".popup");
const buttonAddCard = document.querySelector(".profile__add-button");
const buttonProfileEdit = document.querySelector(".profile__edit-button");
const popupAddCard = document.querySelector(".popup_type_new-card");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const popupTypeImg = document.querySelector(".popup_type_image");
const popupImg = popupTypeImg.querySelector(".popup__image");
const popupImgCaption = popupTypeImg.querySelector(".popup__caption");

// Плавное открытие и закрытие попапов
popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");
});

// Добавление карточки
const formAddCard = popupAddCard.querySelector(".popup__form");
const placeNameInput = popupAddCard.querySelector(
  ".popup__input_type_card-name"
);
const placeLinkInput = popupAddCard.querySelector(".popup__input_type_url");

buttonAddCard.addEventListener("click", () => {
  formAddCard.reset();
  clearValidation(formAddCard, validationConfig);
  openPopup(popupAddCard);
});

function addCard(event) {
  event.preventDefault();

  const newPlace = {
    name: placeNameInput.value,
    link: placeLinkInput.value,
  };

  renderCard(newPlace);
  closePopup(popupAddCard);
}

formAddCard.addEventListener("submit", addCard);

// Редактирование профиля
const formEditProfile = popupProfileEdit.querySelector(".popup__form");
const nameInput = popupProfileEdit.querySelector(".popup__input_type_name");
const jobInput = popupProfileEdit.querySelector(
  ".popup__input_type_description"
);
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

buttonProfileEdit.addEventListener("click", () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  clearValidation(formEditProfile, validationConfig);
  openPopup(popupProfileEdit);
});

function editProfile(event) {
  event.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;

  closePopup(popupProfileEdit);
  formEditProfile.reset();
}

formEditProfile.addEventListener("submit", editProfile);

// Функция открытия попапа карточки
function openLargeImg(cardData) {
  popupImg.src = cardData.link;
  popupImg.alt = cardData.name + ".";
  popupImgCaption.textContent = cardData.name;
  openPopup(popupTypeImg);
}

// Валидация форм
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

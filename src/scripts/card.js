// Функция создания карточки
export function createCard(cardData, delCard, likeCard, openCardImg) {
  const cardTmp = document.querySelector("#card-template").content;
  const card = cardTmp.querySelector(".card").cloneNode(true);
  const cardImg = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const delButton = card.querySelector(".card__delete-button");
  const likeButton = card.querySelector(".card__like-button");

  cardImg.src = cardData.link;
  cardImg.alt = cardData.name + ".";
  cardTitle.textContent = cardData.name;

  delButton.addEventListener("click", delCard);
  likeButton.addEventListener("click", likeCard);
  cardImg.addEventListener("click", () => {
    openCardImg(cardData);
  });

  return card;
}

// Функция удаления карточки
export function deleteCard(event) {
  if (event.target.className !== "card__delete-button") return;
  const cardForDelete = event.target.closest(".card");
  cardForDelete.remove();
}

// Функция переключения лайка
export function toggleLike(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

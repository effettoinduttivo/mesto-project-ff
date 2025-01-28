const cardList = document.querySelector(".places__list");

// Функция создания карточки
function createCard(cardData) {
  const cardTmp = document.querySelector("#card-template").content;
  const card = cardTmp.querySelector(".card").cloneNode(true);
  const cardImg = card.querySelector(".card__image");
  const delButton = card.querySelector(".card__delete-button");
  delButton.addEventListener("click", deleteCard);

  cardImg.src = cardData.link;
  cardImg.alt = cardData.name + ".";
  card.querySelector(".card__title").textContent = cardData.name;

  return card;
}

// Функция удаления карточки
function deleteCard(event) {
  if (event.target.className !== "card__delete-button") return;
  const cardForDelete = event.target.closest(".card");
  cardForDelete.remove();
}

// Вывести карточки на страницу
function renderCard(cardData) {
  const newCard = createCard(cardData);
  cardList.prepend(newCard);
}

initialCards.forEach(renderCard);

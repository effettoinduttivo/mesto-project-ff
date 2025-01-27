const cardList = document.querySelector(".places__list");

// Функция создания карточки
function createCard(element) {
  const cardTmp = document.querySelector("#card-template").content;
  const card = cardTmp.querySelector(".card").cloneNode(true);
  const delButton = card.querySelector(".card__delete-button");
  delButton.addEventListener("click", deleteCard);

  card.querySelector(".card__image").src = element.link;
  card.querySelector(".card__title").textContent = element.name;

  cardList.append(card);
}

// Функция удаления карточки
function deleteCard() {
  const delButton = document.querySelector(".card__delete-button");
  const cardForDelete = delButton.closest(".card");
  cardForDelete.remove();
}

// Вывести карточки на страницу
initialCards.forEach(createCard);

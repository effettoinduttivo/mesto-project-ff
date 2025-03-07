import { putLike, removeLike } from './api.js';

// Функция создания карточки
export function createCard(
  cardData,
  openDelPopup,
  likeCard,
  openCardImg,
  userId
) {
  const cardTmp = document.querySelector('#card-template').content;
  const card = cardTmp.querySelector('.card').cloneNode(true);
  const cardImg = card.querySelector('.card__image');
  const cardTitle = card.querySelector('.card__title');

  cardImg.src = cardData.link;
  cardImg.alt = cardData.name + '.';
  cardTitle.textContent = cardData.name;
  card.id = cardData['_id'];

  cardImg.addEventListener('click', () => {
    openCardImg(cardData);
  });

  const delButton = card.querySelector('.card__delete-button');

  if (cardData.owner['_id'] === userId) {
    delButton.addEventListener('click', () => {
      openDelPopup(card.id);
    });
  } else {
    delButton.style.display = 'none';
  }

  const likeButton = card.querySelector('.card__like-button');
  const likeCounter = card.querySelector('.card__like-counter');
  const isLiked = cardData.likes.some((like) => like['_id'] === userId);

  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }

  likeCounter.textContent = cardData.likes.length;
  likeButton.addEventListener('click', () => {
    likeCard(card.id, likeButton, likeCounter);
  });

  return card;
}

// Функция переключения лайка
export function handleLike(cardId, button, counter) {
  const handleResponse = (data) => {
    button.classList.toggle('card__like-button_is-active');
    counter.textContent = data.likes.length;
  };
  const likeMethod = button.classList.contains('card__like-button_is-active') ? 
    removeLike : putLike;

  likeMethod(cardId)
    .then(handleResponse)
    .catch((err) => console.log('Запрос не выполнен.', err));
}

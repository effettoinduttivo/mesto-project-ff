// Функции открытия и закрытия попапа
export function openPopup(popup) {
  popup.classList.add('popup_is-opened');
  popup.addEventListener('mousedown', closeByClick);
  document.addEventListener('keydown', closeByEsc);
}

export function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
  popup.removeEventListener('mousedown', closeByClick);
  document.removeEventListener('keydown', closeByEsc);
}

// Закрытие по кнопке и клику на оверлей
function closeByClick(event) {
  if (
    event.target.classList.contains('popup__close') ||
    event.target === event.currentTarget
  ) {
    closePopup(event.currentTarget);
  }
}

// Закрытие по клавише Esc
function closeByEsc(event) {
  if (event.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_is-opened');
    closePopup(openedPopup);
  }
}

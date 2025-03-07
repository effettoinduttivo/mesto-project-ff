// Настройки
const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-34',
  headers: {
    authorization: '3c948950-93bc-4fd3-9e2e-2d42ea906d5a',
    'Content-Type': 'application/json',
  },
};

function checkResponse(res) {
  if (!res.ok) {
    return Promise.reject(`Ошибка: ${res.status}`);
  }
  return res.json();
}

// Получение начальных данных
export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
};

export const getCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
};

// Изменение инфо профиля и аватара
export const setProfileInfo = (userName, userJob) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: userName,
      about: userJob,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
};

export const setAvatar = (avatarUrl) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
};

// Добавление карточки
export const createPost = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => {
    return checkResponse(res);
  });
};

// Удаление карточки
export const deletePost = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
};

// Поставить и убрать лайк
export const putLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
};

export const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  }).then((res) => {
    return checkResponse(res);
  });
};

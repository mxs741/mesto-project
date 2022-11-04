const cfg = {
  url: 'https://mesto.nomoreparties.co/v1/plus-cohort-16/',
  headers: {
    authorization: 'c0fd3183-e813-469f-a9c4-cacdccd89151',
    'content-type': 'application/json',
  }
};

// Получить информацию о пользователе
function getProfileInfo() {
  return fetch(`${cfg.url}users/me`, {
    headers: cfg.headers
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
};

// Изменить информацию о пользователе
function postProfileInfo(newPost) {
  return fetch(`${cfg.url}users/me`, {
    method: 'PATCH',
    headers: cfg.headers,
    body: JSON.stringify({
      name: newPost.name,
      about: newPost.about,
      avatar: newPost.avatar,
    }),
  })
};

// Изменить аватар
function postAvatarLink(newPost) {
  return fetch(`${cfg.url}users/me/avatar`, {
    method: 'PATCH',
    headers: cfg.headers,
    body: JSON.stringify({
      avatar: newPost.avatar,
    }),
  })
};

// Получить карточки с сервера
function getInitialCards() {
  return fetch(`${cfg.url}cards`, {
    headers: cfg.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
};

// Отправка новой карточки на сервер
function postCard(titleValue, linkValue) {
  return fetch(`${cfg.url}cards`, {
    method: 'POST',
    headers: cfg.headers,
    body: JSON.stringify({
      name: titleValue,
      link: linkValue,
    }),
  })
  .then(res => console.log(res.json()))
};

// Удаление карточки
function removeCard(cardId) {
  return fetch(`${cfg.url}cards/${cardId}`, {
    method: 'DELETE',
    headers: cfg.headers,
  })
};

// Поставить лайк
function putLike(cardId) {
  return fetch(`${cfg.url}cards/likes/${cardId}`, {
    method: 'PUT',
    headers: cfg.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
};

// Убрать лайк
function putAwayLike(cardId) {
  return fetch(`${cfg.url}cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: cfg.headers,
  })
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  })
};

export {getProfileInfo, postProfileInfo, postAvatarLink, getInitialCards, postCard, removeCard, putLike, putAwayLike}
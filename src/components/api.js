export class Api {
  constructor(options) {
    this._baseUrl = options.url;
    this._headers = options.headers
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getProfileInfo() {
    return fetch(`${this._baseUrl}users/me`, {
      headers: this._headers
    })
    .then(this._handleResponse)
  }

  postProfileInfo(newPost) {
    return fetch(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newPost.name,
        about: newPost.about,
        avatar: newPost.avatar,
      }),
    })
    .then(this._handleResponse)
  }

  postAvatarLink(newPost) {
    return fetch(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newPost.avatar,
      }),
    })
    .then(this._handleResponse)
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}cards`, {
      headers: this._headers,
    })
    .then(this._handleResponse)
  }

  postCard(titleValue, linkValue) {
    return fetch(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: titleValue,
        link: linkValue,
      }),
    })
    .then(this._handleResponse)
  }

  removeCard(cardId) {
    return fetch(`${this._baseUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._handleResponse)
  }

  putLike(cardId) {
    return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
    .then(this._handleResponse)
  }

  putAwayLike(cardId) {
    return fetch(`${this._baseUrl}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
    .then(this._handleResponse)
  }
}
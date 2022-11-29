import {cfg} from '../utils/variables.js';
export class Api {
  constructor(options) {
    this._baseUrl = options.url;
    this._headers = options.headers
  }

  _request(url, options) {
    return fetch(url, options)
    .then(this._handleResponse);
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  getProfileInfo() {
    return this._request(`${this._baseUrl}users/me`, {headers: this._headers});
  }

  postProfileInfo(newPost) {
    return this._request(`${this._baseUrl}users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: newPost.name,
        about: newPost.about,
        avatar: newPost.avatar,
      }),
    })
  }

  postAvatarLink(newPost) {
    return this._request(`${this._baseUrl}users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newPost.avatar,
      }),
    })
  }

  getInitialCards() {
    return this._request(`${this._baseUrl}cards`, {
      headers: this._headers,
    })
  }

  postCard(titleValue, linkValue) {
    return this._request(`${this._baseUrl}cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: titleValue,
        link: linkValue,
      }),
    })
  }

  removeCard(cardId) {
    return this._request(`${this._baseUrl}cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }

  putLike(cardId) {
    return this._request(`${this._baseUrl}cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    })
  }

  putAwayLike(cardId) {
    return this._request(`${this._baseUrl}cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    })
  }
}

export const api = new Api(cfg);
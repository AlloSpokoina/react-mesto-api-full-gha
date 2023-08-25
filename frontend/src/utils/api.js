class Api {
  constructor(options) {
    this._url = options.baseUrl;
  }


  _checkResponse(res) { return res.ok ? res.json() : Promise.reject(new Error(`Ошибка: ${res.status}`)); }


  _request(endpoint, options) {
    return fetch(endpoint, options).then(this._checkResponse);
  }

  changeLikeCardStatus(cardId, isLiked, token) {
    const method = isLiked ? 'PUT' : 'DELETE';
    return this._request(`${this._url}/cards/likes/${cardId}`, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  getInfo(token) {
    return this._request(`${this._url}/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  getCards(token) {
    return this._request(`${this._url}/cards`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  setUserInfo(data, token) {
    return this._request(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        about: data.info,
      }),
    });
  }

  setAddNewAvatar(data, token) {
    return this._request(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    });
  }

  addCard(data, token) {
    return this._request(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    });
  }

  addLike(cardId, token) {
    return this._request(`${this._url}/cards/${cardId}/like`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  deleteLike(cardId, token) {
    return this._request(`${this._url}/cards/${cardId}/like`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  deleteCard(cardId, token) {
    return this._request(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
});

export default api;

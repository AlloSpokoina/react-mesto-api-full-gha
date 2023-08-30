class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }


  _checkResponse(res) { return res.ok ? res.json() : Promise.reject(new Error(`Ошибка: ${res.status}`)); }


  _request(url, options) {
    return fetch(`${this._baseUrl}${url}`, options)
      .then(this._checkResponse)
  }

  changeLikeCardStatus(cardId, isLike, token) {
    const method = isLike ? 'PUT' : 'DELETE';
    return this._request(`/cards/${cardId}/likes`, {
      method,
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  getInfo(token) {
    return this._request(`/users/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  getCards(token) {
    return this._request(`/cards`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }

  setUserInfo(data, token) {
    return this._request(`/users/me`, {
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
    return this._request(`/users/me/avatar`, {
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
    return this._request(`/cards`, {
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
    return this._request(`/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    });
  }

  deleteLike(cardId, token) {
    return this._request(`/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        "Authorization" : `Bearer ${token}`
      }
    });
  }

  deleteCard(cardId, token) {
    return this._request(`/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
  }
}

const api = new Api({
  baseUrl: 'https://api.mestocohort66.nomoredomainsicu.ru',
});

export default api;

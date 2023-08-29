export const baseUrl = 'https://api.mestocohort66.nomoredomainsicu.ru'

function handleResponse(res) {
  return res.ok ? res.json() : Promise.reject(`${res.status} ${res.statusText}`)
}


export function register(email, password) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
      })
  })
  .then(res => handleResponse(res))
}

export function login(email, password) {
  return fetch(`${baseUrl}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email,
      password: password,
    })
  })
  .then(res => handleResponse(res))
}

export function getUserData(token) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    }
  })
    .then(res => handleResponse(res))
};

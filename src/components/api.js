const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort-12',
  headers: {
    authorization: 'd5ba0f59-126c-45d3-8449-3a23fe9da260',
    'Content-Type': 'application/json'
  }
}

export const getInitialCards = () => {
  return fetch(config.baseUrl + '/cards', {
    headers: {
      authorization: config.headers.authorization
    }
  });
}

export const addCard = (cardName, cardAbout) => {
  return fetch(config.baseUrl + '/cards', {
    method: 'POST',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
    body: JSON.stringify({
      name: cardName,
      link: cardAbout
    })
  });
}

export const deleteCard = (cardId) => {
  return fetch(config.baseUrl + '/cards/' + cardId, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  });
}

export const likeCard = (cardId) => {
  return fetch(config.baseUrl + '/cards/likes/' + cardId, {
    method: 'PUT',
    headers: {
      authorization: config.headers.authorization
    }
  });
}

export const unlikeCard = (cardId) => {
  return fetch(config.baseUrl + '/cards/likes/' + cardId, {
    method: 'DELETE',
    headers: {
      authorization: config.headers.authorization
    }
  });
}

export const getProfileInfo = () => {
  return fetch(config.baseUrl + '/users/me', {
    headers: {
      authorization: config.headers.authorization
    }
  });
}

export const updateProfileInfo = (profileName, profileAbout) => {
  return fetch(config.baseUrl + '/users/me', {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
    body: JSON.stringify({
      name: profileName,
      about: profileAbout
    })
  });
}

export const updateAvatar = (profileAvatar) => {
  return fetch(config.baseUrl + '/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: config.headers.authorization,
      'Content-Type': config.headers['Content-Type']
    },
    body: JSON.stringify({
      avatar: profileAvatar
    })
  });
}

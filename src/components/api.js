// Конфиг с токеном и названием группы
const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-17",
  headers: {
    authorization: "e84d5ce9-f5b9-4eb0-9e1e-487356a16ea2",
    "Content-Type": "application/json",
  },
};

// Функция проверки ответа сервера
function getResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Универсальная функция запроса с проверкой ответа
function request(url, options) {
  // принимает два аргумента: урл и объект опций, как и `fetch`
  return fetch(url, options).then(getResponse);
};


// Получение карточек
export const getCards = () => {
  return request(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
};

// Добавление новой карточки
export const addCard = (element) => {
  return request(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({ name: element.name, link: element.link }),
  })
};

// Удаление карточки
export const deleteCardApi = (cardId) => {
  return request(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
};

// Обновление аватара
export const updateAvatar = (avatarUrl) => {
  return request(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar: avatarUrl }),
  })
};

// Загрузка информации о пользователе
export const getUserInfo = () => {
  return request(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
};

// Изменение профиля пользователя
export const updateProfile = (userInfo) => {
  return request(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: userInfo.name,
      about: userInfo.about,
    }),
  })
};

// Постановка лайка
export const likeCardApi = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "PUT",
    headers: config.headers,
  })
};

// Удаление лайка
export const unlikeCardApi = (cardId) => {
  return request(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  })
};

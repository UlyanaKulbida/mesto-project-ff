// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;


//@todo: Функция создания карточки
export function createCard(element, deleteCard, activeLike, showPopImg) {
  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true);

  cardElement.querySelector(".card__image").src = element.link;
  cardElement.querySelector(".card__image").alt = element.name;
  cardElement.querySelector(".card__title").textContent = element.name;
  cardElement.querySelector(".card__delete-button").addEventListener("click", deleteCard);
  cardElement.querySelector(".card__like-button").addEventListener("click", activeLike);
  cardElement.querySelector(".card__image").addEventListener('click', () => {showPopImg(element.link, element.name);});

  return cardElement;
};

//@todo: Функция удаления карточки
export function deleteCard(evt) {
  evt.target.closest(".card").remove();
};

//@todo: Функция обрабатывающая события лайка
export function activeLike(evt) {  
    evt.target.classList.toggle("card__like-button_is-active");
};

//console.log(typeof activeLike);
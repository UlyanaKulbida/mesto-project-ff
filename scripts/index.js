// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки
function createCard(element, deleteCard) {
  const initialCardsElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);

  initialCardsElement.querySelector(".card__image").src = element.link;
  initialCardsElement.querySelector(".card__image").alt = element.name;
  initialCardsElement.querySelector(".card__title").textContent = element.name;
  initialCardsElement
    .querySelector(".card__delete-button")
    .addEventListener("click", deleteCard);

  return initialCardsElement;
}

//@todo: Функция удаления карточки
function deleteCard(evt) {
  evt.target.closest(".card").remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  placesList.prepend(createCard(element, deleteCard));
});

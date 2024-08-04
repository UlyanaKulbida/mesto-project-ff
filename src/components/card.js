//@todo: Функция создания карточки
import { deleteCardApi, likeCardApi, unlikeCardApi } from "./api.js";

export function createCard(element, userId, deleteCard, likeCard, showPopImg) {
  //Темплейт карточки
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardLikeCounter = cardElement.querySelector(".card__like-counter");
  const cardTitle = cardElement.querySelector(".card__title");

  cardImage.src = element.link;
  cardImage.alt = element.name;
  cardTitle.textContent = element.name;

  //Корзина
  if (element.owner._id != userId) {
    cardElement.querySelector(".card__delete-button").remove();
  } else {
    cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", (evt) => deleteCard(evt, element));
  }

  //Лайк
  cardLikeCounter.textContent = element.likes.length;
  cardElement
    .querySelector(".card__like-button")
    .addEventListener("click", (evt) => likeCard(evt, element));
  if (element.likes.some((like) => like._id === userId)) {
    cardElement
      .querySelector(".card__like-button")
      .classList.add("card__like-button_is-active");
  }

  cardImage.addEventListener("click", () => {
    showPopImg(element.link, element.name);
  });

  return cardElement;
}

//Функция удаления карточки
export function deleteCard(evt, element) {
  const cardDel = evt.target.closest(".card");
  deleteCardApi(element._id)
    .then(() => {
      cardDel.remove();
    })
    .catch((err) => {
      console.log(`Ошибка, не выполенено: ${err.status}`);
    });
}

//Функция обработки лайка
export function likeCard(evt, element) {
  if (evt.target.classList.contains("card__like-button_is-active")) {
    unlikeCardApi(element._id)
      .then((res) => {
        evt.target.classList.remove("card__like-button_is-active");
        evt.target
          .closest(".card")
          .querySelector(".card__like-counter").textContent = res.likes.length;
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  } else {
    likeCardApi(element._id)
      .then((res) => {
        evt.target.classList.add("card__like-button_is-active");
        evt.target
          .closest(".card")
          .querySelector(".card__like-counter").textContent = res.likes.length;
      })
      .catch((err) => console.log(`Ошибка: ${err}`));
  }
}

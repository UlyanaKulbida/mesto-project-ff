import "../pages/index.css";
//import { initialCards } from "./cards.js";
import { createCard, deleteCard, likeCard } from "./card.js";
import { openModal, closeModal } from "./modal.js";
import { enableValidation, clearValidation } from "./validation1.js";
import {
  getCards,
  addCard,
  updateAvatar,
  getUserInfo,
  updateProfile,
} from "./api.js";

// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

// Кнопки открытия модального окна
const profileEditAvatar = document.querySelector(".profile__image");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

// Кнопка зарытия модального окна
const popupCloseButtons = document.querySelectorAll(".popup__close");

// DOM узлы попапа "Редактировать аватар"
const popupTypeAvatar = document.querySelector(".popup_type_avatar");
const popupAvatarForm = popupTypeAvatar.querySelector(".popup__form");
const imgInput = popupAvatarForm.querySelector(".popup__input_type_avatar");

// DOM узлы попапа "Редактировать профиль"
const profileTitle = document.querySelector(".profile__title");
const profilDescription = document.querySelector(".profile__description");

const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupProfileForm = popupTypeEdit.querySelector(".popup__form");
const nameInput = popupProfileForm.querySelector(".popup__input_type_name");
const jobInput = popupProfileForm.querySelector(
  ".popup__input_type_description"
);

// DOM узлы попапа "Добавить новое место"
const popupTypeNewCard = document.querySelector(".popup_type_new-card");
const popupCardForm = popupTypeNewCard.querySelector(".popup__form");
const imgNameInput = popupCardForm.querySelector(
  ".popup__input_type_card-name"
);
const imgLinkInput = popupCardForm.querySelector(".popup__input_type_url");

// DOM узлы попапа "Увеличить картинку"
const popupImage = document.querySelector(".popup_type_image");
const popupImageLink = popupImage.querySelector(".popup__image");
const popupImageName = popupImage.querySelector(".popup__caption");

let userId = null;

// переменные для валидация форм
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

// Вызов валидации
enableValidation(validationConfig);

//ОБРАБОТЧИКИ

//обработчик события закрытия по крестику
popupCloseButtons.forEach((item) => {
  item.addEventListener("click", () => {
    const modal = item.closest(".popup");
    closeModal(modal);
  });
});

//обработчик события открытия попапа "Редактировать аватар"
profileEditAvatar.addEventListener("click", () => {
  openModal(popupTypeAvatar);
  clearValidation(popupAvatarForm, validationConfig);
});

//обработчик события открытия попапа "Редактировать профиль"
profileEditButton.addEventListener("click", () => {
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profilDescription.textContent;
});

//обработчик события открытия попапа "Добавить новое место"
profileAddButton.addEventListener("click", () => {
  openModal(popupTypeNewCard);
  //clearValidation(popupCardForm, validationConfig);
});

//ФУНКЦИИ с обработчиками submit

//-----Функция сообщения "Схранение..."------
function renderLoading(isLoading, button) {
  button.textContent = isLoading ? "Сохранение..." : "Сохранить";
}

//-----Функция отправки формы "Редактировать аватар"-----
function handleFormSubmitNewAvatar(evt) {
  evt.preventDefault();
  renderLoading(true, evt.submitter);

  const newAvatarURL = imgInput.value;
  updateAvatar(newAvatarURL)
    .then((newLink) => {
      profileEditAvatar.style.backgroundImage = `url(${newLink.avatar})`;
      closeModal(popupTypeAvatar);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
  popupAvatarForm.reset();
}

// Обработчик к форме "Редактировать аватар" для "submit"
popupAvatarForm.addEventListener("submit", handleFormSubmitNewAvatar);

//-----Функция отправки формы "Редактировать профиль"-----
function handleFormSubmitEditProfile(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы
  renderLoading(true, evt.submitter);

  const userData = {
    name: nameInput.value,
    about: jobInput.value,
  };
  updateProfile(userData)
    .then(() => {
      profileTitle.textContent = nameInput.value;
      profilDescription.textContent = jobInput.value;
      closeModal(popupTypeEdit);
    })
    .catch((error) =>
      console.error(`Ошибка изменения данных пользователя: ${error}`)
    )
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
}

// Обработчик к форме "Редактировать профиль" для "submit"
popupProfileForm.addEventListener("submit", handleFormSubmitEditProfile);

//-----Функция отправки формы "Добавить новое место"-----
function handleFormSubmitNewPlace(evt) {
  evt.preventDefault(); // отмена стандартной отправки формы
  renderLoading(true, evt.submitter);

  const newCard = { name: imgNameInput.value, link: imgLinkInput.value };
  addCard(newCard)
    .then((newCardData) => {
      placesList.prepend(
        createCard(
          newCardData,
          newCardData.owner._id,
          deleteCard,
          likeCard,
          showPopImg
        )
      );
      closeModal(popupTypeNewCard);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      renderLoading(false, evt.submitter);
    });
  popupCardForm.reset();
}

// Обработчик к форме "Добавить новое место" для "submit"
popupCardForm.addEventListener("submit", handleFormSubmitNewPlace);

//-----Функция открытие попапа "Увеличить картинку"-----
function showPopImg(link, name) {
  popupImageLink.src = link;
  popupImageLink.alt = name;
  popupImageName.textContent = name;
  openModal(popupImage);
}

// Загрузка данных пользователя и карточек, передача массива промисов которые нужно выполнить
Promise.all([getUserInfo(), getCards()])
  .then(([userData, initialCards]) => {
    userId = userData._id;
    profileTitle.textContent = userData.name;
    profilDescription.textContent = userData.about;
    profileEditAvatar.style.backgroundImage = `url(${userData.avatar})`;
    //imgInput.style.backgroundImage = `url(${userData.avatar})`;
    initialCards.forEach((element) => {
      const cardAdd = createCard(
        element,
        userId,
        deleteCard,
        likeCard,
        showPopImg
      );
      placesList.append(cardAdd);
    });
  })
  .catch((error) => console.error(`Ошибка загрузки данных: ${error}`));

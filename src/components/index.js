import '../pages/index.css';
import {initialCards} from './cards.js';
import { createCard, deleteCard, activeLike} from './card.js';
import { openModal, closeModal} from './modal.js';


// @todo: DOM узлы
const placesList = document.querySelector(".places__list");

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

const profileTitle = document.querySelector('.profile__title');
const profilDescription = document.querySelector('.profile__description');

const popupCloseButtons = document.querySelectorAll('.popup__close');

// DOM узлы попапа "Редактировать профиль"
const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupProfileForm = popupTypeEdit.querySelector('.popup__form');
const nameInput = popupProfileForm.querySelector('.popup__input_type_name');
const jobInput = popupProfileForm.querySelector('.popup__input_type_description');

// DOM узлы попапа "Добавить новое место"
const popupTypeNewCard = document.querySelector('.popup_type_new-card');
const popupCardForm = popupTypeNewCard.querySelector('.popup__form');
const imgNameInput = popupCardForm.querySelector('.popup__input_type_card-name');
const imgLinkInput = popupCardForm.querySelector('.popup__input_type_url');

// DOM узлы попапа "Увеличить картинку"
const popupImage = document.querySelector('.popup_type_image');
const popupImageLink = popupImage.querySelector('.popup__image');
const popupImageName = popupImage.querySelector('.popup__caption');


// @todo: Вывести карточки на страницу
initialCards.forEach(function (element) {
  placesList.prepend(createCard(element, deleteCard, activeLike, showPopImg));
});


//обработчик события закрытия по крестику
popupCloseButtons.forEach((item) => {
  item.addEventListener('click', () => {
    const modal = item.closest('.popup');
    closeModal(modal);
  });
});

//обработчик события открытия попапа "Добавить новое место"
profileAddButton.addEventListener('click', () => openModal(popupTypeNewCard));

//обработчик события открытия попапа "Редактировать профиль"
profileEditButton.addEventListener('click', () => {
  openModal(popupTypeEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profilDescription.textContent;
});


// Функция отправки формы "Редактировать профиль"
function handleFormSubmitEditProfile(evt) {  
  evt.preventDefault(); // отмена стандартной отправки формы

  const newName = nameInput.value; // Получение значений полей jobInput и nameInput из свойства value
  const newJob = jobInput.value;
  
  // Выбор элементов, куда должны быть вставлены значения полей
  // Вставка новых значения с помощью textContent
  profileTitle.textContent = newName;       
  profilDescription.textContent = newJob;  
  closeModal(popupTypeEdit);
};

// Прикрепляем обработчик к форме "Редактировать профиль" для "submit"
popupProfileForm.addEventListener('submit', handleFormSubmitEditProfile); 


//Функция отправки формы "Добавить новое место"
function handleFormSubmitNewPlace(evt) {
  evt.preventDefault() // отмена стандартной отправки формы

  const newCard = {name: imgNameInput.value, link: imgLinkInput.value};

  placesList.prepend(createCard(newCard, deleteCard, activeLike, showPopImg));
  popupCardForm.reset();
  closeModal(popupTypeNewCard);
};

// Прикрепляем обработчик к форме "Добавить новое место" для "submit"
popupCardForm.addEventListener('submit', handleFormSubmitNewPlace); 


// Функция открытие попапа "Увеличить картинку"
function showPopImg(link, name) {  
  popupImageLink.src = link;
  popupImageLink.alt = name;
  popupImageName.textContent = name;
  openModal(popupImage);
};
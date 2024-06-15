// Открытие попапа
export function openModal(popup) {
    popup.classList.add('popup_is-animated');
   // popup.classList.add('popup_is-opened');
    setTimeout(() => {
        popup.classList.add('popup_is-opened');
    }, 1);
    document.addEventListener('keydown', closeModalEsc);
    document.addEventListener('mousedown', closeModalOverlay);
};

// Закрытие попапа
export function closeModal(popup) {
    popup.classList.add('popup_is-animated');
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', closeModalEsc);
    document.removeEventListener('mousedown', closeModalOverlay);
};

// Закрытие попапа кликом на Esc
function closeModalEsc(evt) {
    if (evt.key === 'Escape') {
        closeModal(document.querySelector('.popup_is-opened'));
    }
};

// Закрытие попапа кликом на оверлей
function closeModalOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        closeModal(document.querySelector('.popup_is-opened'));
    }
}
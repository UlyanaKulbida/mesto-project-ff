(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-17",headers:{authorization:"e84d5ce9-f5b9-4eb0-9e1e-487356a16ea2","Content-Type":"application/json"}};function t(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}function n(e,n){return fetch(e,n).then(t)}function r(e,t,n,r,o){var c=document.querySelector("#card-template").content.querySelector(".places__item").cloneNode(!0),a=c.querySelector(".card__image"),u=c.querySelector(".card__like-counter"),i=c.querySelector(".card__title");return a.src=e.link,a.alt=e.name,i.textContent=e.name,e.owner._id!=t?c.querySelector(".card__delete-button").remove():c.querySelector(".card__delete-button").addEventListener("click",(function(t){return n(t,e)})),u.textContent=e.likes.length,c.querySelector(".card__like-button").addEventListener("click",(function(t){return r(t,e)})),e.likes.some((function(e){return e._id===t}))&&c.querySelector(".card__like-button").classList.add("card__like-button_is-active"),a.addEventListener("click",(function(){o(e.link,e.name)})),c}function o(t,r){var o,c=t.target.closest(".card");(o=r._id,n("".concat(e.baseUrl,"/cards/").concat(o),{method:"DELETE",headers:e.headers})).then((function(){c.remove()})).catch((function(e){console.log("Ошибка, не выполенено: ".concat(e.status))}))}function c(t,r){var o;t.target.classList.contains("card__like-button_is-active")?(o=r._id,n("".concat(e.baseUrl,"/cards/likes/").concat(o),{method:"DELETE",headers:e.headers})).then((function(e){t.target.classList.remove("card__like-button_is-active"),t.target.closest(".card").querySelector(".card__like-counter").textContent=e.likes.length})).catch((function(e){return console.log("Ошибка: ".concat(e))})):function(t){return n("".concat(e.baseUrl,"/cards/likes/").concat(t),{method:"PUT",headers:e.headers})}(r._id).then((function(e){t.target.classList.add("card__like-button_is-active"),t.target.closest(".card").querySelector(".card__like-counter").textContent=e.likes.length})).catch((function(e){return console.log("Ошибка: ".concat(e))}))}function a(e){e.classList.add("popup_is-animated"),setTimeout((function(){e.classList.add("popup_is-opened")}),1),document.addEventListener("keydown",i),document.addEventListener("mousedown",l)}function u(e){e.classList.add("popup_is-animated"),e.classList.remove("popup_is-opened"),document.removeEventListener("keydown",i),document.removeEventListener("mousedown",l)}function i(e){"Escape"===e.key&&u(document.querySelector(".popup_is-opened"))}function l(e){e.target.classList.contains("popup")&&u(e.target)}function s(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.inputErrorClass),r.classList.remove(n.errorClass),r.textContent=""}var d=function(e,t){e.disabled=!0,e.classList.add(t.inactiveButtonClass)};function p(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.inactiveButtonClass)):d(t,n)}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}var _=document.querySelector(".places__list"),m=document.querySelector(".profile__image"),y=document.querySelector(".profile__edit-button"),v=document.querySelector(".profile__add-button"),h=document.querySelectorAll(".popup__close"),b=document.querySelector(".popup_type_avatar"),S=b.querySelector(".popup__form"),q=S.querySelector(".popup__input_type_avatar"),L=document.querySelector(".profile__title"),g=document.querySelector(".profile__description"),k=document.querySelector(".popup_type_edit"),E=k.querySelector(".popup__form"),C=E.querySelector(".popup__input_type_name"),x=E.querySelector(".popup__input_type_description"),A=document.querySelector(".popup_type_new-card"),w=A.querySelector(".popup__form"),U=w.querySelector(".popup__input_type_card-name"),T=w.querySelector(".popup__input_type_url"),j=document.querySelector(".popup_type_image"),O=j.querySelector(".popup__image"),B=j.querySelector(".popup__caption"),D=null,P={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function I(e,t){t.textContent=e?"Сохранение...":"Сохранить"}function M(e,t){O.src=e,O.alt=t,B.textContent=t,a(j)}!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){t.addEventListener("submit",(function(e){e.preventDefault()})),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);p(n,r,t),e.addEventListener("reset",(function(){d(r,t)})),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?s(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.inputErrorClass),o.classList.add(r.errorClass),o.textContent=n}(e,t,t.validationMessage,n)}(e,o,t),p(n,r,t)}))}))}(t,e)}))}(P),h.forEach((function(e){e.addEventListener("click",(function(){u(e.closest(".popup"))}))})),m.addEventListener("click",(function(){a(b),function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.submitButtonSelector);n.forEach((function(n){s(e,n,t)})),d(r,t)}(S,P)})),y.addEventListener("click",(function(){a(k),C.value=L.textContent,x.value=g.textContent})),v.addEventListener("click",(function(){a(A)})),S.addEventListener("submit",(function(t){var r;t.preventDefault(),I(!0,t.submitter),(r=q.value,n("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})})).then((function(e){m.style.backgroundImage="url(".concat(e.avatar,")"),u(b),S.reset()})).catch((function(e){console.error(e)})).finally((function(){I(!1,t.submitter)}))})),E.addEventListener("submit",(function(t){var r;t.preventDefault(),I(!0,t.submitter),(r={name:C.value,about:x.value},n("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:r.name,about:r.about})})).then((function(){L.textContent=C.value,g.textContent=x.value,u(k)})).catch((function(e){return console.error("Ошибка изменения данных пользователя: ".concat(e))})).finally((function(){I(!1,t.submitter)}))})),w.addEventListener("submit",(function(t){var a;t.preventDefault(),I(!0,t.submitter),(a={name:U.value,link:T.value},n("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:a.name,link:a.link})})).then((function(e){_.prepend(r(e,e.owner._id,o,c,M)),u(A),w.reset()})).catch((function(e){console.error(e)})).finally((function(){I(!1,t.submitter)}))})),Promise.all([n("".concat(e.baseUrl,"/users/me"),{headers:e.headers}),n("".concat(e.baseUrl,"/cards"),{headers:e.headers})]).then((function(e){var t,n,a=(n=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var n=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=n){var r,o,c,a,u=[],i=!0,l=!1;try{if(c=(n=n.call(e)).next,0===t){if(Object(n)!==n)return;i=!1}else for(;!(i=(r=c.call(n)).done)&&(u.push(r.value),u.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=n.return&&(a=n.return(),Object(a)!==a))return}finally{if(l)throw o}}return u}}(t,n)||function(e,t){if(e){if("string"==typeof e)return f(e,t);var n={}.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(e):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}(t,n)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),u=a[0],i=a[1];D=u._id,L.textContent=u.name,g.textContent=u.about,m.style.backgroundImage="url(".concat(u.avatar,")"),i.forEach((function(e){var t=r(e,D,o,c,M);_.append(t)}))})).catch((function(e){return console.error("Ошибка загрузки данных: ".concat(e))}))})();
(()=>{"use strict";var e=document.querySelector(".popup_add"),t=document.querySelector(".profile__name"),n=document.querySelector(".profile__description"),r=document.querySelector(".popup_edit"),o=document.querySelector(".form__input_name"),c=document.querySelector(".form__input_description"),a=document.querySelector(".btn_type_edit"),u=document.querySelector(".btn_type_add"),i=document.querySelector(".form__btn_type_create"),s=document.querySelector(".form__btn_edit-avatar"),l=document.querySelector(".form__btn_edit-profile"),d=document.querySelector(".form__edit"),f=document.querySelector(".form__add"),m=document.querySelector(".form__edit-avatar"),_=document.querySelector(".popup_edit-avatar"),p=document.querySelector(".profile__avatar-wrapper"),v=document.querySelector(".form__input-avatar-link"),y=document.querySelector(".profile__avatar"),h={url:"https://mesto.nomoreparties.co/v1/plus-cohort-16/",headers:{authorization:"c0fd3183-e813-469f-a9c4-cacdccd89151","content-type":"application/json"}},S=document.querySelectorAll(".btn_type_close"),q=document.querySelector(".form__input_type_name"),b=document.querySelector(".form__input_type_link"),k=document.querySelector(".elements"),E=document.querySelector("#element-template").content,L=document.querySelector(".popup_element"),g=L.querySelector(".element__img_size_full"),C=L.querySelector(".element__img-caption");function x(e){"Escape"===e.key&&P(document.querySelector(".popup_opened"))}function j(e){e.classList.add("popup_opened"),document.addEventListener("keydown",x)}function P(e){e.classList.remove("popup_opened"),document.removeEventListener("keydown",x)}function A(e,t,n,r,o,c,a,u){var i=E.querySelector(".element").cloneNode(!0),s=i.querySelector(".element__title"),l=i.querySelector(".element__img"),d=i.querySelector(".btn_type_like"),f=i.querySelector(".btn_type_remove-card"),m=i.querySelector(".element__number-of-likes"),_=f.closest(".element");return s.textContent=e,l.src=t,l.alt=e,m.textContent=a||"0",d.addEventListener("click",(function(e){o(r,n,m,e)})),f.addEventListener("click",(function(){c(_,n)})),l.addEventListener("click",(function(){C.textContent=e,g.src=t,g.alt=e,j(L)})),u&&r!==u&&(f.style.display="none"),i}function I(e,t,n){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?(t.disabled=!1,t.classList.remove(n.btnInactive)):(t.disabled=!0,t.classList.add(n.btnInactive))}S.forEach((function(e){var t=e.closest(".popup");e.addEventListener("click",(function(){return P(t)}))}));function M(e,t,n,r){(!function(e){return e.target.classList.contains("btn_type_like-active")}(r)?function(e){return fetch("".concat(h.url,"cards/likes/").concat(e),{method:"PUT",headers:h.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(t):function(e){return fetch("".concat(h.url,"cards/likes/").concat(e),{method:"DELETE",headers:h.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))}(t)).then((function(t){!function(e,t){e.textContent=t}(n,t.likes.length),function(e,t){t?e.target.classList.add("btn_type_like-active"):e.target.classList.remove("btn_type_like-active")}(r,function(e,t){return e.some((function(e){return e._id===t}))}(t.likes,e))})).catch((function(e){return console.log(e)}))}function T(e,t){(function(e){return fetch("".concat(h.url,"cards/").concat(e),{method:"DELETE",headers:h.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))})(t).then((function(){e.remove()})).catch((function(e){return console.log(e)}))}var w;Promise.all([fetch("".concat(h.url,"users/me"),{headers:h.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))})),fetch("".concat(h.url,"cards"),{headers:h.headers}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))]).then((function(e){t.textContent=e[0].name,n.textContent=e[0].about,y.src=e[0].avatar,e[1].forEach((function(t){k.append(A(t.name,t.link,t._id,e[0]._id,M,T,t.likes.length,t.owner._id))}))})).catch((function(e){return console.log(e)})),a.addEventListener("click",(function(){j(r),o.value=t.textContent,c.value=n.textContent})),d.addEventListener("submit",(function(e){var a;e.preventDefault(),l.textContent="Сохранение...",(a={name:t.textContent,about:n.textContent},fetch("".concat(h.url,"users/me"),{method:"PATCH",headers:h.headers,body:JSON.stringify({name:a.name,about:a.about,avatar:a.avatar})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){t.textContent=o.value,n.textContent=c.value,P(r)})).catch((function(e){return console.log(e)})).finally((function(){l.textContent="Сохранить"}))})),p.addEventListener("click",(function(){return j(_)})),m.addEventListener("submit",(function(e){var t;e.preventDefault(),s.textContent="Сохранение...",(t={avatar:y.src},fetch("".concat(h.url,"users/me/avatar"),{method:"PATCH",headers:h.headers,body:JSON.stringify({avatar:t.avatar})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(){y.src=v.value,P(_)})).catch((function(e){return console.log(e)})).finally((function(){s.textContent="Сохранить"}))})),u.addEventListener("click",(function(){return j(e)})),f.addEventListener("submit",(function(t){var n,r;t.preventDefault(),i.textContent="Сохранение...",(n=q.value,r=b.value,fetch("".concat(h.url,"cards"),{method:"POST",headers:h.headers,body:JSON.stringify({name:n,link:r})}).then((function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))}))).then((function(n){!function(e,t,n,r){k.prepend(A(q.value,b.value,e,t,n,r))}(n._id,n.owner._id,M,T),t.target.reset(),i.disabled=!0,i.classList.add("form__btn_inactive"),P(e)})).catch((function(e){return console.log(e)})).finally((function(){i.textContent="Создать"}))})),Array.from(document.querySelectorAll(".popup")).forEach((function(e){e.addEventListener("click",(function(e){e.target.classList.remove("popup_opened")}))})),w={formSelector:".form",inputSelector:".form__input",btnSelector:".form__btn",btnInactive:"form__btn_inactive",formInputError:"form__input_type_error",formErrorMessage:"form__error-message_activate"},Array.from(document.querySelectorAll(w.formSelector)).forEach((function(e){!function(e,t){var n=Array.from(e.querySelectorAll(t.inputSelector)),r=e.querySelector(t.btnSelector);I(n,r,t),n.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?function(e,t,n){var r=e.querySelector(".".concat(t.id,"-error"));t.classList.remove(n.formInputError),r.classList.remove(n.formErrorMessage),r.textContent=""}(e,t,n):function(e,t,n,r){var o=e.querySelector(".".concat(t.id,"-error"));t.classList.add(r.formInputError),o.classList.add(r.formErrorMessage),o.textContent=n}(e,t,t.validationMessage,n)}(e,o,t),I(n,r,t)}))}))}(e,w)}))})();
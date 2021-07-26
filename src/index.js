import './sass/main.scss';
import { galleryItems } from './js/inputData'; // массив входных данных
import { createMarkup } from './js/renderMarkup'; // функция-рендер разметки из входных данных по заданомк шаблону

// получить ссылки на нужные DOM-узлы
const ulContainer = document.querySelector('.js-gallery');
const modalW = document.querySelector('.js-lightbox');
const closeBtn = document.querySelector('button[data-action="close-lightbox"]');
const lightboxImage = document.querySelector('.lightbox__image');
const overlay = document.querySelector('.lightbox__overlay');

// создание и добавление разметки в список галереи
const markup = createMarkup(galleryItems);
ulContainer.innerHTML = markup;

//============================== ЛОВИМ И ОБРАБАТЫВАЕМ СОБЫТИЯ =========================

// добавляет слушатель клика по элементу галереи
ulContainer.addEventListener('click', onImageClick);

// обработчик клика по элементу галереи
function onImageClick(event) {
   event.preventDefault();
   if (!event.target.dataset.source) {
      return;
   }

   // открытие модалки при клике по элементу галереи
   modalOpen(event);
}

// реализация функции открытия модалки при клике по элементу галереи
function modalOpen(e) {
   modalW.classList.add('is-open');
   const url = e.target.dataset.source;
   lightboxImage.src = url;

   let idx = Number(e.target.dataset.id);

   window.addEventListener('keydown', e => {
      if (e.code === 'ArrowRight' && idx < galleryItems.length - 1) {
         idx += 1;
      }
      if (e.code === 'ArrowLeft' && idx >= 1) {
         idx -= 1;
      }
      lightboxImage.src = galleryItems[idx].original;
   });

   closeBtn.addEventListener('click', modalClose);
   window.addEventListener('keydown', onKeyPress);
   overlay.addEventListener('click', onOverlayClick);
}

// реализация закрытия модального окна
function modalClose() {
   modalW.classList.remove('is-open');
   lightboxImage.src = '';
   window.removeEventListener('keydown', onKeyPress);
   overlay.removeEventListener('click', onOverlayClick);
}

// обработчик для реализации закрытия модалки при нажатии клавиши ESC
// и пролистывания изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
function onKeyPress(e) {
   if (e.code === 'Escape') {
      modalClose();
   }
}

// обработчик для реализации закрытия модалки при клике на overlay
function onOverlayClick(e) {
   if (e.currentTarget !== e.target) {
      return;
   }
   modalClose();
}

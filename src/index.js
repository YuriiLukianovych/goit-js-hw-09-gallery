import './sass/main.scss';

const galleryItems = [
   {
      preview:
         'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
      original:
         'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
      description: 'Hokkaido Flower',
   },
   {
      preview:
         'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
      original:
         'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
      description: 'Container Haulage Freight',
   },
   {
      preview:
         'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
      original:
         'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
      description: 'Aerial Beach View',
   },
   {
      preview:
         'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
      original:
         'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
      description: 'Flower Blooms',
   },
   {
      preview:
         'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
      original:
         'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
      description: 'Alpine Mountains',
   },
   {
      preview:
         'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
      original:
         'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
      description: 'Mountain Lake Sailing',
   },
   {
      preview:
         'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
      original:
         'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
      description: 'Alpine Spring Meadows',
   },
   {
      preview:
         'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
      original:
         'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
      description: 'Nature Landscape',
   },
   {
      preview:
         'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
      original:
         'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
      description: 'Lighthouse Coast Sea',
   },
];

// получить ссылки на нужные DOM-узлы
const ulContainer = document.querySelector('.js-gallery');
const modalW = document.querySelector('.js-lightbox');
const closeBtn = document.querySelector('button[data-action="close-lightbox"]');
const lightboxImage = document.querySelector('.lightbox__image');
const overlay = document.querySelector('.lightbox__overlay');

// создание и добавление разметки в список галереи
const markup = createMarkup(galleryItems);
ulContainer.innerHTML = markup;

// функция-рендер разметки по массиву данных galleryItems и предоставленному шаблону
// возвращает валидный для HTML-парсинга текст-разметку
function createMarkup(arr) {
   const markupList = arr.map((el, index) => {
      return `
    <li class="gallery__item">
      <a class="gallery__link"
        href=${el.original}>
        <img
          class="gallery__image"
          src=${el.preview}
          data-source=${el.original}
          data-id=${index}
          alt=${el.description}
        />
      </a>
    </li>`;
   });

   return markupList.join('');
}

//============================== ЛОВИМ И ОБРАБАТЫВАЕМ СЩБЫТИЯ =========================

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

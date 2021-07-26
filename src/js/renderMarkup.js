// функция-рендер разметки по массиву данных galleryItems и предоставленному шаблону
// возвращает валидный для HTML-парсинга текст-разметку
export function createMarkup(arr) {
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

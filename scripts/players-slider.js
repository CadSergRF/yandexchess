import { players } from '../data/players.js'

// Получаем обертку карусели
const wrapper = document.querySelector('.carousel__wrapper');
// Шаблон карточки участника
export const playerTemplateElement = document.querySelector('#playerTemplate').content;
// Шаблон карточки участника
export const playersBlockTemplateElement = document.querySelector('#playersBlockTemplate').content;
// Элемент карусель
const carousel = document.querySelector('.carousel__players');

// Функция создания карточки участника
const createPlayer = (card) => {
  // Берем шаблон
  const element = playerTemplateElement.querySelector('.players__item').cloneNode(true);
  // Элементы шаблона
  const playerImg = element.querySelector('.player__image')
  const playerName = element.querySelector('.player__name')
  const playerTitle = element.querySelector('.player__title')
  // Устанавливаем значения
  playerImg.src = card.img;
  playerName.textContent = card.name;
  playerTitle.textContent = card.title;
  // Отдаем готовый
  return element;
}

// Ширина обертки карусели
let wrapperWidth = wrapper.clientWidth;
// Ширина карточки участника
let cardWidth
if (window.screen.width < 450) {
  cardWidth = 394;
} else {
  cardWidth = 300;
}

// let cardWidth = document.querySelector('.players__item').clientWidth
// Сколько целых карточек поместится в обертку
let cardsViewed = Math.trunc(wrapperWidth / cardWidth);
// Сколько нужно "экранов" для всех карточек
let countDivCards = Math.ceil(players.length / cardsViewed)

// Формируем разделенный массив участников
const chunkPlayers = players.reduce((resultArray, item, index) => {
  const chunkIndex = Math.floor(index / cardsViewed)

  if (!resultArray[chunkIndex]) {
    resultArray[chunkIndex] = [] // новый блок
  }

  resultArray[chunkIndex].push(item)

  return resultArray
}, [])

// Проходим по разделенному массиву
// и строим элемент
chunkPlayers.map((item) => {
  const element = playersBlockTemplateElement.querySelector('.players-block__item').cloneNode(true);
  // в него добавляем игроков
  const playersList = element.querySelector('.players-block__list');
  // Подгоняем ширину по обертку
  element.style.minWidth = `${wrapperWidth}px`;
  // Устанавливаем кол-во блоков Грида
  playersList.style.gridTemplateColumns = `repeat(${item.length}, 1fr)`

  item.map((elem) => {
    playersList.appendChild(createPlayer(elem));
  })

  carousel.appendChild(element);
})

// КНОПКИ УПРАВЛЕНИЯ КАРУСЕЛЬЮ
const lessBtnElem = document.querySelector('.carousel__btn-less');
const moreBtnElem = document.querySelector('.carousel__btn-more');
const currentCountCardsElem = document.querySelector('.currentCountCards');
const maxCountCardsElem = document.querySelector('.maxCountCards');
maxCountCardsElem.textContent = players.length;
currentCountCardsElem.textContent = cardsViewed;
let numCardsDiv = 1;
lessBtnElem.disabled = true;

let oneDivPercent = 100 / countDivCards;

moreBtnElem.onclick = function () {
  if (numCardsDiv < countDivCards) {
    numCardsDiv++;
    lessBtnElem.disabled = false;
    // Сдвигаем карусель
    carousel.style.transform = `translateX(-${oneDivPercent * (numCardsDiv - 1)}%)`;

    if (numCardsDiv === countDivCards) {
      currentCountCardsElem.textContent = `${players.length}`;
      moreBtnElem.disabled = true;
      return;
    }

    currentCountCardsElem.textContent = `${numCardsDiv * cardsViewed}`;
  }
}

lessBtnElem.onclick = function () {
  if (numCardsDiv >= 2) {
    numCardsDiv--;
    moreBtnElem.disabled = false;

    if (numCardsDiv === 1) {
      lessBtnElem.disabled = true;
      currentCountCardsElem.textContent = `${cardsViewed}`;
      // ЕСЛИ ПЕРВЫЙ ЭЛЕМЕНТ ТО НЕ СДВИГАЕМ
      carousel.style.transform = 'translateX(-0%)';
      return;
    }

    // Сдвигаем карусель
    carousel.style.transform = `translateX(-${oneDivPercent * (numCardsDiv - 1)}%)`;
    currentCountCardsElem.textContent = `${numCardsDiv * cardsViewed}`;
  }
}



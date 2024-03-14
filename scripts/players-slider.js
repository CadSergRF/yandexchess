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
let cardWidth = 394;
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
  const playersList = element.querySelector('.players-block__list');

  element.style.minWidth = `${wrapperWidth}px`;

  item.map((elem) => {
    playersList.appendChild(createPlayer(elem));
  })
  carousel.appendChild(element);
})

// КНОПКИ УПРАВЛЕНИЯ КАРУСЕЛЬЮ
const lessBtn = document.querySelector('.carousel__btn-less');
const moreBtn = document.querySelector('.carousel__btn-more');
let count = cardsViewed;
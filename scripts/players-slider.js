import { players } from '../data/players.js'

// Получаем размер окна
const pageWidth = document.documentElement.scrollWidth;
// Количество участников
const playersCount = players.length;

const slider = document.querySelector('players__slider');
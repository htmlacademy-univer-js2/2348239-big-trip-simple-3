import {getRandomInteger} from '../utils/util.js';
import {destinations, eventTypes, offersByEventType} from './const.js';


const generateEventType = () => {
  const key = Object.keys(eventTypes)[getRandomInteger(0, Object.keys(eventTypes).length - 1)];
  return eventTypes[key];
};

const getRandomOffersIds = (type) => {
  const randomIds = [];
  const currentOffers = offersByEventType.find((offer) => offer.type === type);
  const randomLength = getRandomInteger(0, currentOffers.offers.length - 1);
  if (randomLength === 0) {
    return randomIds;
  }
  for (let i = 0; i < randomLength; i++) {
    randomIds.push(currentOffers.offers[i].id);
  }
  return randomIds;
};

export const generatePoint = () => {
  const type = generateEventType();
  const dayFrom = String(getRandomInteger(1, 15)).padStart(2, '0');
  const hourFrom = String(getRandomInteger(1, 12)).padStart(2, '0');
  const hourTo = getRandomInteger(12, 23);
  const dayTo = getRandomInteger(15, 31);

  return ({
    id: getRandomInteger(1, 100),
    basePrice: getRandomInteger(100, 2000),
    dateFrom: `2023-06-${dayFrom}T${hourFrom}:${getRandomInteger(10, 50)}:56.845Z`,
    dateTo: `2023-06-${dayTo}T${hourTo}:${getRandomInteger(30, 55)}:13.375Z`,
    destination: destinations[getRandomInteger(0, destinations.length - 1)],
    offers: getRandomOffersIds(type),
    type,
  });
};

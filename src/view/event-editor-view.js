import AbstractView from '../framework/view/abstract-view.js';
import { destinations, offersByEventType } from '../mocks/const.js';
import { separateDate } from '../utils/util.js';

const createOffersTemplate = (offers, type) => {
  const currentOffersByType = offersByEventType.find((o) => o.type === type).offers;
  const offersContainer = document.createElement('section');
  offersContainer.classList.add('event__section');
  offersContainer.classList.add('event__section--offers');
  for (let i = 0; i < currentOffersByType.length; i++) {
    const newOfferElement = document.createElement('div');
    newOfferElement.classList.add('event__offer-selector');
    const offer = currentOffersByType[i];
    newOfferElement.insertAdjacentHTML('beforeend', `
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.title.toLowerCase()}-1" type="checkbox"
      name="event-offer-${offer.title.toLowerCase()}" ${offers.includes(offer.id) ? 'checked' : ''}>
      <label class="event__offer-label" for="event-offer-${offer.title.toLowerCase()}-1">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </label>
    `);
    offersContainer.appendChild(newOfferElement);
  }
  return offersContainer.innerHTML;
};

const createEditEventTemplate = (point) => {
  const {basePrice, dateFrom, dateTo, destination, offers, type} = point;
  return (
    `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>

            <div class="event__type-item">
              <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi">
              <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus">
              <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train">
              <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship">
              <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive">
              <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight">
              <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in">
              <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing">
              <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
            </div>

            <div class="event__type-item">
              <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant">
              <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
            </div>
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type.toUpperCase()}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value=${destination.name} list="destination-list-1">
        <datalist id="destination-list-1">
          <option value=${destinations[0].name}></option>
          <option value=${destinations[1].name}></option>
          <option value=${destinations[2].name}></option>
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${separateDate(dateFrom)}>
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${separateDate(dateTo)}>
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value=${basePrice}>
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${createOffersTemplate(offers, type)}
        </div>
      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${destination.description}</p>
      </section>
    </section>
  </form>`
  );};

export default class EventEditorView extends AbstractView {

  #point = null;

  constructor(point) {
    super();
    this.#point = point;
  }

  get template() {
    return createEditEventTemplate(this.#point);
  }

  get rollupButton() {
    return this.element.querySelector('.event__rollup-btn');
  }

  setRollupHandler = (callback) => {
    this._callback.rollup = callback;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#rollupHandler);
  };

  setFormSubmitHandler = (callback) => {
    this._callback.formSubmit = callback;
    this.element.addEventListener('submit', this.#formSubmitHandler);
  };

  #rollupHandler = (evt) => {
    evt.preventDefault();
    this._callback.rollup();
  };

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.formSubmit();
  };
}
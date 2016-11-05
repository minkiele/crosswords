import EventEmitter from 'events';

export default class Crosswords {
  constructor () {
    this.eventManager = new EventEmitter();
  }

  getEventManager () {
    return this.eventManager;
  }

}

import EventEmitter from 'events';
import React from 'react';
import ReactDOM from 'react-dom';
import CrosswordsUI from './UI/Crosswords';
import {DEFAULT_ROWS, DEFAULT_COLS} from './Constants';


export default class Crosswords {

  constructor (container) {

    this.rows = DEFAULT_ROWS;
    this.cols = DEFAULT_COLS;

    this.container = container;
    this.eventManager = new EventEmitter();

    this.render();

    this.eventManager.on('change.rows', (rows) => {
      this.rows = rows;
      this.render();
    });

    this.eventManager.on('change.cols', (cols) => {
      this.cols = cols;
      this.render();
    });

  }

  getEventManager () {
    return this.eventManager;
  }

  render () {
    ReactDOM.render(<CrosswordsUI eventManager={this.eventManager} rows={this.rows} cols={this.cols} />, this.container);
  }

}

import React from 'react';
import ReactDOM from 'react-dom';
import EventEmitter from 'events';
import CrosswordsUI from './UI/Crosswords';
import Matrix from './Math/Matrix';
import {DEFAULT_ROWS, DEFAULT_COLS} from './Constants';


export default class Crosswords {

  constructor (container) {

    this.rows = DEFAULT_ROWS;
    this.cols = DEFAULT_COLS;
    this.matrix = new Matrix(this.rows, this.cols);

    this.container = container;
    this.eventManager = new EventEmitter();

    this.render();

    this.eventManager.on('change.rows', (rows) => {
      this.rows = rows;
      this.matrix.setRows(this.rows);
      this.render();
    });

    this.eventManager.on('change.cols', (cols) => {
      this.cols = cols;
      this.matrix.setCols(this.cols);
      this.render();
    });

    this.eventManager.on('change.formCell.toggleBlack', (row, col) => {
      try {
        let blackFalse = this.matrix.getCellValue(row, col);
        this.matrix.setCellValue(row, col, blackFalse === false ? '' : false);
        this.render();
      } catch(err) {
        //STFU
        console.warn(err);
      }
    });

    this.eventManager.on('change.formCell.value', (row, col, value) => {
      try {
        this.matrix.setCellValue(row, col, value);
        this.render();
      } catch(err) {
        //STFU
        console.warn(err);
      }
    });

  }

  getEventManager () {
    return this.eventManager;
  }

  render () {
    ReactDOM.render(<CrosswordsUI rows={this.rows} cols={this.cols} matrix={this.matrix} eventManager={this.eventManager} />, this.container);
  }

}

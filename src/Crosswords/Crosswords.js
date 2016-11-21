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

  isDefinitionEligible(row, col) {
    let cellValue = this.matrix.getCellValue(row, col);
    if(cellValue === false) {
      //Black cell, no number
      return false;
    } else if(row === 0 || col === 0) {
      //No black cell, check if is along left/top borders
      return true;
    } else {
      //Check for black cells above (vertical)
      let cellAbove = this.matrix.getCellValue(row - 1, col);
      if(cellAbove === false) {
        //Check if there is at least a cell below
        if(row < this.rows - 1) {
          //If that's the case check that the cell isn't black
          let cellBelow = this.matrix.getCellValue(row + 1, col);
          if(cellBelow !== false) {
            return true;
          }
        }
      }
      //Check for black cells before (horizontal)
      let cellBefore = this.matrix.getCellValue(row, col - 1);
      if(cellBefore === false) {
        //Check if there is at least a cell after
        if(col < this.cols - 1) {
          //If that's the case check that the cell isn't black
          let cellAfter = this.matrix.getCellValue(row, col + 1);
          if(cellAfter !== false) {
            return true;
          }
        }
      }
      //All other cases
      return false;
    }
  }
  
  getDefinitionCoords() {

    let coords = {};
    let definition = 0;

    for(let i = 0; i < this.rows; i += 1){
      for(let j = 0; j < this.cols; j += 1){
        if(this.isDefinitionEligible(i, j)) {
            definition += 1;
            coords[`${i}${j}`] = definition;
        }
      }
    }
    
    return coords;
    
  }

  render () {
    ReactDOM.render(<CrosswordsUI rows={this.rows} cols={this.cols} matrix={this.matrix} definitions={this.getDefinitionCoords()} eventManager={this.eventManager} />, this.container);
  }

}

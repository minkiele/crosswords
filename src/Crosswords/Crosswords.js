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

  //Very similar, check if
  isHorizontalDefinitionEligible(row, col) {
    let cellValue = this.matrix.getCellValue(row, col);
    if(cellValue === false) {
      //Black cell, no number
      return false;
    } else {
      //Test if there can be a definition on that row
      let testCellAfter = col === 0 || this.matrix.getCellValue(row, col - 1) === false;
      if(testCellAfter) {
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

  isVerticalDefinitionEligible(row, col) {
    let cellValue = this.matrix.getCellValue(row, col);
    if(cellValue === false) {
      //Black cell, no number
      return false;
    } else {
      //Test if there can be a definition on that row
      let testCellBelow = row === 0 || this.matrix.getCellValue(row - 1, col) === false;
      if(testCellBelow) {
        //Check if there is at least a cell below
        if(row < this.rows - 1) {
          //If that's the case check that the cell isn't black
          let cellBelow = this.matrix.getCellValue(row + 1, col);
          if(cellBelow !== false) {
            return true;
          }
        }
      }
      //All other cases
      return false;
    }
  }

  getDefinitionEligibility (row, col) {
    return {
      h: this.isHorizontalDefinitionEligible(row, col),
      v: this.isVerticalDefinitionEligible(row, col)
    };
  }

  isDefinitionEligible(row, col) {
    let eligibility = this.getDefinitionEligibility(row, col);
    return eligibility.h || eligibility.v;
  }

  getDefinitionData() {

    let coords = {};
    let horizontal = [];
    let vertical = [];
    let definition = 0;

    for(let i = 0; i < this.rows; i += 1){
      for(let j = 0; j < this.cols; j += 1){
        let eligibility = this.getDefinitionEligibility(i, j);
        if(eligibility.h || eligibility.v) {
            definition += 1;
            coords[`${i}-${j}`] = definition;
            if(eligibility.h) {
              horizontal.push(definition);
            }
            if(eligibility.v) {
              vertical.push(definition);
            }
        }
      }
    }

    return {
      coords: coords,
      horizontal: horizontal,
      vertical: vertical
    };

  }

  render () {
    ReactDOM.render(<CrosswordsUI rows={this.rows} cols={this.cols} matrix={this.matrix} definitions={this.getDefinitionData()} eventManager={this.eventManager} />, this.container);
  }

}

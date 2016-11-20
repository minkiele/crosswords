const DEFAULT_ROWS = 0;
const DEFAULT_COLS = 0;
const DEFAULT_VALUE = '';

export default class Matrix {

  constructor(rows = DEFAULT_ROWS, cols = DEFAULT_COLS, defaultValue = DEFAULT_VALUE) {
    this.rows = Math.abs(rows);
    this.cols = Math.abs(cols);
    this.defaultValue = defaultValue;
    this.initializeMatrix();
  }

  initializeMatrix () {
    this.matrix = this.getNewRows(this.rows);
  }

  getNewRows (rows) {
    let newRows = new Array(rows);
    for(let i = 0; i < rows; i += 1) {
      newRows[i] = this.getNewRow(this.cols);
    }
    return newRows;
  }

  getNewRow (cols) {
    let newRow = new Array(cols);
    for(let i = 0; i < cols; i += 1) {
      newRow[i] = this.defaultValue;
    }
    return newRow;
  }

  setRows (newRows) {

    newRows = Math.abs(newRows);

    if(newRows < this.rows && this.rows - newRows >= 0) {
      this.matrix.splice(newRows, this.rows - newRows);
      this.rows = newRows;
    } else if(newRows > this.rows) {
      let rows = this.getNewRows(newRows - this.rows);
      Array.prototype.push.apply(this.matrix, rows);
      this.rows = newRows;
    }

  }

  setCols (newCols) {
    newCols = Math.abs(newCols);
    if (newCols < this.cols && this.cols - newCols >= 0) {
      this.matrix.forEach((row) => {
        row.splice(newCols, this.cols - newCols);
      });
      this.cols = newCols;
    } else if(newCols > this.cols) {
      this.matrix.forEach((row) => {
        let newRow = this.getNewRow(newCols - this.cols);
        Array.prototype.push.apply(row, newRow);
      });
      this.cols = newCols;
    }
  }

  getRow (index) {
    if(this.isValidRowIndex(index)) {
      return this.matrix[index].slice();
    } else {
      throw `Row index out of bounds, either matrix is empty or you didn't input a number lower than ${this.cols}`;
    }
  }

  getCol (index) {
    if(this.isValidColIndex(index)) {
      return this.matrix.map(function (col) {
        return col[index];
      });
    } else {
      throw `Col index out of bounds, either matrix is empty or you didn't input a number lower than ${this.cols}`;
    }
  }

  isValidIndex (index, limit) {
    return index >= 0 && index < limit;
  }

  isValidRowIndex (index) {
    return this.isValidIndex(index, this.rows);
  }

  isValidColIndex (index) {
    return this.isValidIndex(index, this.cols);
  }

  isValidMatrixIndex(row, col) {
    return this.isValidRowIndex(row) && this.isValidColIndex(col);
  }

  setCellValue (row, col, value) {
    if(this.isValidMatrixIndex(row, col)) {
      this.matrix[row][col] = value;
    } else {
      throw 'One or both of the indexes are out of bounds, either matrix is empty or index is wrong';
    }
  }

  getCellValue (row, col) {
    if(this.isValidMatrixIndex(row, col)) {
      return this.matrix[row][col];
    } else {
      throw 'One or both of the indexes are out of bounds, either matrix is empty or index is wrong';
    }
  }

}

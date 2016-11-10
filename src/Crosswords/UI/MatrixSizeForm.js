import React from 'react';
import {toInt} from '../Utils';
import {DEFAULT_ROWS, DEFAULT_COLS} from '../Constants';

export default class MatrixSizeForm extends React.Component {

  constructor (props) {
    super(props);
  }

  updateMatrixRows (rows) {
    this.updateMatrixProp('rows', toInt(rows));
  }

  updateMatrixCols (cols) {
    this.updateMatrixProp('cols', toInt(cols));
  }

  updateMatrixProp (name, value) {
    this.props.eventManager.emit(`change.${name}`, value);
  }

  render () {
    return (
      <form className="matrixSizeForm">
        <label>
          Rows
          <input type="number" defaultValue={this.props.rows} onChange={(evt) => {this.updateMatrixRows(evt.target.value);}} />
        </label>

        <label>
          Cols
          <input type="number" defaultValue={this.props.cols} onChange={(evt) => {this.updateMatrixCols(evt.target.value);}} />
        </label>
      </form>
    );
  }

}


MatrixSizeForm.propTypes = {
  rows: React.PropTypes.number.isRequired,
  cols: React.PropTypes.number.isRequired,
  eventManager: React.PropTypes.object.isRequired,
};

MatrixSizeForm.defaultProps = {
  rows: DEFAULT_ROWS,
  cols: DEFAULT_COLS
};

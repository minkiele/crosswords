import React from 'react';
import MatrixFormRow from './MatrixFormRow';
import Matrix from '../Math/Matrix';
import {DEFAULT_ROWS, DEFAULT_COLS} from '../Constants';

export default class MatrixForm extends React.Component {

  render () {

    let rows = [];

    for(let row = 0; row < this.props.rows; row += 1) {
      rows.push(
        <MatrixFormRow key={row.toString()} row={row} cols={this.props.cols} matrixRow={this.props.matrix.getRow(row)} eventManager={this.props.eventManager} />
      );
    }

    return (
      <form className="matrixForm">
        <table className="matrixFormTable">
          <tbody>
            {rows}
          </tbody>
        </table>
      </form>
    );
  }

}


MatrixForm.propTypes = {
  rows: React.PropTypes.number.isRequired,
  cols: React.PropTypes.number.isRequired,
  matrix: React.PropTypes.instanceOf(Matrix).isRequired,
  eventManager: React.PropTypes.object.isRequired
};

MatrixForm.defaultProps = {
  rows: DEFAULT_ROWS,
  cols: DEFAULT_COLS
};

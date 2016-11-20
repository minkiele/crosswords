import React from 'react';
import MatrixFormCell from './MatrixFormCell';

export default class MatrixFormRow extends React.Component {

  render () {

    let cells = [];

    for(let col = 0; col < this.props.cols; col += 1) {
      cells.push(
        <MatrixFormCell key={col.toString()} row={this.props.row} col={col} matrixCol={this.props.matrixRow[col]} eventManager={this.props.eventManager} />
      );
    }

    return (
      <tr>
        {cells}
      </tr>
    );
  }

}


MatrixFormRow.propTypes = {
  cols: React.PropTypes.number.isRequired,
  row: React.PropTypes.number.isRequired,
  matrixRow: React.PropTypes.array.isRequired,
  eventManager: React.PropTypes.object.isRequired
};

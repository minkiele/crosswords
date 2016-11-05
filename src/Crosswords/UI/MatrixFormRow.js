import React from 'react';
import MatrixFormCell from './MatrixFormCell';

export default class MatrixFormRow extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {

    let cells = [];

    for(let col = 0; col < this.props.cols; col += 1) {
      cells.push(
        <MatrixFormCell key={col.toString()} row={this.props.row} col={col} eventManager={this.props.eventManager} />
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
  eventManager: React.PropTypes.object.isRequired
};

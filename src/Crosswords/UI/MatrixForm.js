import React from 'react';
import MatrixFormRow from './MatrixFormRow';

export default class MatrixForm extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {

    let rows = [];

    for(let row = 0; row < this.props.rows; row += 1) {
      rows.push(
        <MatrixFormRow key={row.toString()} row={row} cols={this.props.cols} eventManager={this.props.eventManager} />
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
  eventManager: React.PropTypes.object.isRequired
};
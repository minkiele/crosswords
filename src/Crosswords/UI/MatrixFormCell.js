import React from 'react';

export default class MatrixFormCell extends React.Component {

  toggleBlackStatus () {
    this.props.eventManager.emit('change.formCell.toggleBlack', this.props.row, this.props.col);
  }

  updateColValue (value) {
    this.props.eventManager.emit('change.formCell.value', this.props.row, this.props.col, value);
  }

  getCellClassName () {
    return this.props.matrixCol === false ? 'black' : '';
  }

  render () {

    return (
      <td onDoubleClick={() => { this.toggleBlackStatus(); }} className={this.getCellClassName()}>
        <input type="text" cols="2" onChange={(evt) => { this.updateColValue(evt.target.value); }} value={this.props.matrixCol} />
      </td>
    );
  }

}

MatrixFormCell.propTypes = {
  eventManager: React.PropTypes.object.isRequired,
  row: React.PropTypes.number.isRequired,
  col: React.PropTypes.number.isRequired,
  matrixCol: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
    React.PropTypes.bool
  ]).isRequired,
};

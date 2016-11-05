import React from 'react';

export default class MatrixFormCell extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      black: this.props.black
    };
  }

  toggleBlackStatus () {
    this.setState(function (previousState) {
      return {
        black: !previousState.black
      };
    });
  }

  getCellClassName () {
    return this.state.black ? 'black' : '';
  }

  render () {

    return (
      <td onDoubleClick={() => { this.toggleBlackStatus(); }} className={this.getCellClassName()}>
        <input type="text" cols="2" />
      </td>
    );
  }

}

MatrixFormCell.propTypes = {
  eventManager: React.PropTypes.object.isRequired,
  row: React.PropTypes.number.isRequired,
  col: React.PropTypes.number.isRequired,
  black: React.PropTypes.bool.isRequired
};

MatrixFormCell.defaultProps = {
  black: false
};

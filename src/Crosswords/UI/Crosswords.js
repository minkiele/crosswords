import React from 'react';
import MatrixSizeForm from './MatrixSizeForm';
import MatrixForm from './MatrixForm';
import {DEFAULT_ROWS, DEFAULT_COLS} from '../Constants';

export default class Crosswords extends React.Component {

  constructor (props) {
    super(props);
  }

  render () {
    return (
      <div className="container">
        <MatrixSizeForm rows={this.props.rows} cols={this.props.cols} eventManager={this.props.eventManager} />
        <MatrixForm rows={this.props.rows} cols={this.props.cols} eventManager={this.props.eventManager} />
      </div>
    );
  }

}

Crosswords.propTypes = {
  rows: React.PropTypes.number.isRequired,
  cols: React.PropTypes.number.isRequired,
  eventManager: React.PropTypes.object.isRequired
};

Crosswords.defaultProps = {
  rows: DEFAULT_ROWS,
  cols: DEFAULT_COLS
};

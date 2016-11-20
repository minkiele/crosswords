import React from 'react';
import MatrixSizeForm from './MatrixSizeForm';
import MatrixForm from './MatrixForm';
import {DEFAULT_ROWS, DEFAULT_COLS} from '../Constants';
import Matrix from '../Math/Matrix';

export default class Crosswords extends React.Component {

  render () {
    return (
      <div className="container">
        <MatrixSizeForm rows={this.props.rows} cols={this.props.cols} eventManager={this.props.eventManager} />
        <MatrixForm {...this.props} />
      </div>
    );
  }

}

Crosswords.propTypes = {
  rows: React.PropTypes.number.isRequired,
  cols: React.PropTypes.number.isRequired,
  matrix: React.PropTypes.instanceOf(Matrix).isRequired,
  eventManager: React.PropTypes.object.isRequired
};

Crosswords.defaultProps = {
  rows: DEFAULT_ROWS,
  cols: DEFAULT_COLS
};

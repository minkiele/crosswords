import React from 'react';
import MatrixSizeForm from './MatrixSizeForm';
import MatrixForm from './MatrixForm';
import {DEFAULT_ROWS, DEFAULT_COLS} from '../Constants';
import Matrix from '../Math/Matrix';
import DefinitionsList from './DefinitionsList';

export default class Crosswords extends React.Component {

  render () {
    return (
      <div className="container">
        <MatrixSizeForm rows={this.props.rows} cols={this.props.cols} eventManager={this.props.eventManager} />
        <MatrixForm {...this.props} />
        <section>
          <h2>Horizontal</h2>
          <DefinitionsList definitions={this.props.definitions.horizontal} eventManager={this.props.eventManager} />
        </section>
        <section>
          <h2>Vertical</h2>
          <DefinitionsList definitions={this.props.definitions.vertical} eventManager={this.props.eventManager} />
        </section>
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

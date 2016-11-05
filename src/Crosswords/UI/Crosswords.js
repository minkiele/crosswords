import React from 'react';
import MatrixSizeForm from './MatrixSizeForm';
import MatrixForm from './MatrixForm';

export default class Crosswords extends React.Component {

  constructor (props) {
    super(props);
    this.state = {
      rows: this.props.rows,
      cols: this.props.cols
    };

    this.props.eventManager.on('change.rows', (rows) => {
      this.setState({rows: rows});
    });

    this.props.eventManager.on('change.cols', (cols) => {
      this.setState({cols: cols});
    });

  }

  render () {
    return (
      <div className="container">
        <MatrixSizeForm rows={this.state.rows} cols={this.state.cols} eventManager={this.props.eventManager} />
        <MatrixForm rows={this.state.rows} cols={this.state.cols} eventManager={this.props.eventManager} />
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
  rows: 0,
  cols: 0
};

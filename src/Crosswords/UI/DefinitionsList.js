import React from 'react';

export default class DefinitionsList extends React.Component {

  renderDefinitionsList () {
    let list = [];
    for(let i = 0; i < this.props.definitions.length; i += 1) {
      list.push(
        <li>{this.props.definitions[i]}. <input type="text" /></li>
      );
    }
    return list;
  }

  render () {
    return (
      <ul className="definitionsList">
        {this.renderDefinitionsList()}
      </ul>
    );
  }

}

DefinitionsList.propTypes = {
  definitions: React.PropTypes.array.isRequired,
  eventManager: React.PropTypes.object.isRequired
};

DefinitionsList.defaultProps = {
  definitions: []
};

import React from 'react';
import ReactDOM from 'react-dom';
import CrosswordsUI from './Crosswords/UI/Crosswords';
import CrosswordsApp from './Crosswords/Crosswords';

var app = new CrosswordsApp();

ReactDOM.render(<CrosswordsUI eventManager={app.getEventManager()} />, document.getElementById('app'));

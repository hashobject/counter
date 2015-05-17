'use strict';
var React = require('react');
var Count = require('react-count');
var OnlineCount = require('react-count').OnlineCount;
var ViewCount = require('react-count').ViewCount;

var App = React.createClass({

  render: function() {
    return (
      <Count counterText="followers"
             actionDoText="follow"
             actionDoneText="followed"
             allowMultiple={true}
             firebaseHost="https://counter-button.firebaseio.com/"
             firebaseResourceId='followers-counter'/>
    )
  }
});

React.render(
  <App />,
  document.getElementById('widget')
)
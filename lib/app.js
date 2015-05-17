'use strict';
var React = require('react');
var Count = require('react-count');
var OnlineCount = require('react-count').OnlineCount;
var ViewCount = require('react-count').ViewCount;

var App = React.createClass({

  render: function() {
    var search = window.location.search;
    if (search === '') {
      return (<div></div>);
    }
    var queryParams = search.split('?')[1].split('&');
    var paramsArray = queryParams.map(function(item) {
      var splitted = item.split('=');
      var param = {};
      param[splitted[0]] = splitted[1];
      return param;
    });
    var params = paramsArray.reduce(function(acc, item) {
      var paramName = Object.keys(item)[0];
      var paramValue = item[paramName];
      acc[paramName] = paramValue;
      return acc;
    }, {});
    var widget;
    var text = params.counterText;
    if (params.counterType === 'viewcount') {
      widget = <ViewCount
                counterText= 'views'
                firebaseHost="https://counter-button.firebaseio.com/"
                firebaseResourceId='followers-counter'/>
    } else if (params.counterType === 'onlinecount') {
      widget = <OnlineCount
                counterText= 'views'
                firebaseHost="https://counter-button.firebaseio.com/"
                firebaseResourceId='followers-counter'/>
    }
    return (
      widget
    )
  }
});

React.render(
  <App />,
  document.getElementById('widget')
)
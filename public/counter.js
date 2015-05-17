(function(){

  // give up and resort to `target=_blank`
  // if we're not modern enough
  if (!document.body.getBoundingClientRect
   || !document.body.querySelectorAll
   || !window.postMessage) {
    return;
  }

  // search for a script tag pointing to counter.js
  function search(){
    var replaced = 0;
    var scripts = document.querySelectorAll('script');
    var script;
    for (var i = 0; i < scripts.length; i++) {
      script = scripts[i];
      if (!script.src) continue;
      if (/\/counter\.js(\?.*)?$/.test(script.src)) {
        // replace script with iframe
        replace(script);

        // we abort the search for subsequent
        // counter.js executions to exhaust
        // the queue
        return true;
      }
    }
  }

  // replace the script tag with an iframe
  function replace(script){
    var parent = script.parentNode;
    if (!parent) return;

    var iframe = document.createElement('iframe');

    var iframePath = '/iframe';
    if (script.attributes['counter-type']) {
      var counterType = script.attributes['counter-type'].value;
      iframePath += '?counterType=' + counterType;
    }
    iframe.src = script.src.replace(/\/counter\.js.*/, iframePath);
    iframe.style.borderWidth = 0;
    iframe.className = '__counter';
    iframe.style.width = '190px';
    iframe.style.height = '27px';

    // hidden by default to avoid flicker
    iframe.style.visibility = 'hidden';

    parent.insertBefore(iframe, script);
    parent.removeChild(script);

    // setup iframe RPC
    iframe.onload = function(){
      setup(iframe);
    };
  }

  // setup an "RPC" channel between iframe and us
  function setup(iframe){
    var id = Math.random() * (1 << 24) | 0;
    iframe.contentWindow.postMessage('counter:' + id, '*');
    window.addEventListener('message', function(e){

      // update width
      var wp = 'counter-width:' + id + ':';
      if (wp == e.data.substr(0, wp.length)) {
        var width = e.data.substr(wp.length);
        iframe.style.width = width + 'px';
        // ensure it's shown (since first time hidden)
        iframe.style.visibility = 'visible';
      }
      var hp = 'counter-height:' + id + ':';
      if (hp == e.data.substr(0, hp.length)) {
        var height = e.data.substr(hp.length);
        iframe.style.height = height + 'px';
      }
    });
  }

  var found = search();
  if (!found) setTimeout(search, 5000);

})();

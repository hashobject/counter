

(function(){

  // give up and resort to `target=_blank`
  // if we're not modern enough
  if (!document.body.getBoundingClientRect
   || !document.body.querySelectorAll
   || !window.postMessage) {
    return;
  }

  // the id for the script we capture
  var id;

  // listen on setup event from the parent
  // to set up the id
  window.addEventListener('message', function onmsg(e){
    if (/^counter:/.test(e.data)) {
      id = e.data.replace(/^counter:/, '');

      window.removeEventListener('message', onmsg);

      // notify initial width
      refresh();
    }
  });

  // notify parent about current width
  var button = document.querySelector('.react-count');
  var lastWidth;
  function refresh(){
    var width = button.getBoundingClientRect().width;
    if (top != window && window.postMessage) {
      var but = document.querySelector('.react-count');
      var width = Math.ceil(but.getBoundingClientRect().width);
      if (lastWidth != width) {
        lastWidth = width;
        parent.postMessage('counter-width:' + id + ':' + width, '*');
      }
    }
  }

})();
import Rx from 'rx';
import $ from 'jquery';

var input = document.getElementById('drag');

var mouseUpStream = Rx.Observable.fromEvent(input, 'mouseup'); // #1
var mouseDownStream = Rx.Observable.fromEvent(input, 'mousedown');
var mouseMoveStream = Rx.Observable.fromEvent(document, 'mousemove');

var mouseDragStream = mouseDownStream.flatMap((md) => { // #2
  var startX = md.offsetX, startY = md.offsetY;

  return mouseMoveStream.map((mm) => { // #3
    mm.preventDefault();

    return {
      left: mm.clientX - startX,
      top: mm.clientY - startY,
      target: mm.target,
    };
  }).takeUntil(mouseUpStream); // #4
});

mouseDragStream.subscribe((event) => { // #5
  event.target.style.top = event.top + 'px';
  event.target.style.left = event.left + 'px';
});

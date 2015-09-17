import Rx from 'rx';
import $ from 'jquery';

var input = document.getElementById('drag');

var mouseUpStream = Rx.Observable.fromEvent(input, 'mouseup');
var mouseDownStream = Rx.Observable.fromEvent(input, 'mousedown');
var mouseMoveStream = Rx.Observable.fromEvent(document, 'mousemove');

var mouseDragStream = mouseDownStream.flatMap((md) => {
  var startX = md.offsetX, startY = md.offsetY;

  return mouseMoveStream.map((mm) => {
    mm.preventDefault();

    console.log(mm.clientX);
    console.log(mm.clientY);

    return {
      left: mm.clientX - startX,
      top: mm.clientY - startY,
      target: mm.target, // IMPORTANT CHANGE: the element you care about
    };
  }).takeUntil(mouseUpStream);
});

mouseDragStream.subscribe((event) => {
  event.target.style.top = event.top + 'px';
  event.target.style.left = event.left + 'px';
});

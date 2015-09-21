import Rx from 'rx';

var father = document.getElementById('father');

var mouseMoveStream = Rx.Observable.fromEvent(document, 'mousemove');

mouseMoveStream
  .map((event) => {
    return { top: event.clientY, left: event.clientX }
  })
  .subscribe((coords) => {
    father.style.top = coords.top + 'px';
    father.style.left = coords.left + 'px';
  })

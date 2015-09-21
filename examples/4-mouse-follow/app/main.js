import Rx from 'rx';

function getElementWidth(el) { return parseInt(getComputedStyle(el).width, 10); }
function setCoord(coords) {
  this.style.top = coords.top + 'px';
  this.style.left = coords.left + 'px';
}

const DELAY = 100;

const father = document.getElementById('father');
const child = document.getElementById('child');

const mouseMoveStream = Rx.Observable.fromEvent(document, 'mousemove');

const fatherMove = mouseMoveStream
  .map((event) => {
    return { top: event.clientY, left: event.clientX }
  });

const childMove = fatherMove.map((item) => {
  return {
    top: item.top,
    left: parseInt(item.left, 10) + getElementWidth(father)
  }
});


fatherMove.subscribe(setCoord.bind(father));

childMove
  .delay(DELAY)
  .subscribe(setCoord.bind(child));

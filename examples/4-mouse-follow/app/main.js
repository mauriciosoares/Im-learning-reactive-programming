import Rx from 'rx';

function getElementWidth(el) { return parseInt(getComputedStyle(el).width, 10); }
function setCoord(coords) {
  this.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}

const DELAY = 100;
const father = document.getElementById('father');

const mouseMoveStream = Rx.Observable.fromEvent(document, 'mousemove');

const fatherMove = mouseMoveStream
  .map((event) => {
    return { top: event.clientY, left: event.clientX }
  });
fatherMove.subscribe(setCoord.bind(father));


let previousWidth = 0;

for(let i = 1; i <= 10; i += 1) {
  previousWidth += getElementWidth(father);
  let newDiv = document.createElement('div');
  newDiv.className = 'children';
  document.body.appendChild(newDiv);

  (function(left) {
    const childMove = fatherMove.map((item) => {
      return {
        top: item.top,
        left: parseInt(item.left, 10) + left
      }
    });

    childMove
      .delay(DELAY + (i * 50))
      .subscribe(setCoord.bind(newDiv));
  } (previousWidth))
}

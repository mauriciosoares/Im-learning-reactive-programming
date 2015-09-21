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


let previousElement;
for(let i = 1; i <= 10; i += 1) {
  let newDiv = document.createElement('div');
  newDiv.className = 'children';
  document.body.appendChild(newDiv);

  const childMove = fatherMove.map((item) => {
    return {
      top: item.top,
      left: parseInt(item.left, 10) + getElementWidth(father)
    }
  });



  childMove
    .delay(DELAY + (i * 100))
    .subscribe(setCoord.bind(newDiv));
}

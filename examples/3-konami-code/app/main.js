import Rx from 'rx';

const CODES = [ // #1
  38, // up
  38, // up
  40, // down
  40, // down
  37, // left
  39, // right
  37, // left
  39, // right
  66, // b
  65  // a
];

let codeStream = Rx.Observable.from(CODES); // #2

let keyUpStream = Rx.Observable.fromEvent(document, 'keyup'); // #3

let konamiStream = keyUpStream
  .map((event) => event.which) // #4
  .windowWithCount(10, 1) // #5
  .flatMap((stream) => stream.sequenceEqual(codeStream)) // #6
  .filter((sequence) => sequence) // #7
  .take(1); // #8

konamiStream.subscribe((item) => {
  console.log('Konami');
});

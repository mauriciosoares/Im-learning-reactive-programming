import Rx from 'rx';

const codes = [ // #1
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

let konami = Rx.Observable.fromArray(codes); // #2

let keyUpStream = Rx.Observable.fromEvent(document, 'keyup'); // #3

let konamiStream = keyUpStream.map((e) => e.keyCode) // #4 get the key code
  .windowWithCount(10, 1) // #5 get the last 10 keys
  .flatMap((x) => x.sequenceEqual(konami)) // #6  compare to known konami code sequence
  .filter((equal) => equal) // where we match
  .subscribe(() => {
    console.log('konami');
  });

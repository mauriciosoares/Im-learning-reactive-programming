import Rx from 'rx';

const codes = [
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

let konami = Rx.Observable.fromArray(codes);

let keyUpStream = Rx.Observable.fromEvent(document, 'keyup');

let konamiStream = keyUpStream.map((e) => e.keyCode) // get the key code
  .windowWithCount(10, 1) // get the last 10 keys
  .flatMap((x) => x.sequenceEqual(konami)) // compare to known konami code sequence
  .filter((equal) => equal) // where we match
  .subscribe(() => {
    console.log('konami');
  });

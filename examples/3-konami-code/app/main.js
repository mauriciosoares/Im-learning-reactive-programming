import Rx from 'rx';

let keyUp = Rx.Observable.fromEvent(document, 'keyup');

keyUp.subscribe((event) => {
	console.log(event);
});

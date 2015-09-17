## Comments

1. we created an observer of the DOM event `keyup` from the #search element Everytime I typesomething, this stream is triggered if someone has subscribed to it.

2. Here I'm creating another stream of the dom event `keyup`, and I can filter the value a little bit, to improve the UX of the app

3. only retrieve values after 250 of throttle that means that the event won't fire if I keep typing really fast

4. this will trigger whenever the value is different from the previous one ex: If I clik in the arrow button is still a keyup event, but the value has not changed.

5. Here I create the stream that actually fetches the foursquare API

6. flatMapLatest guarantees that only the latest ajax response will be triggered in the callback. the searchFoursquare function is in the last lines of code.

7. here I subscribe to all the streams that I created previously. Without this line no code would actually run.

8. Here I create a function that returns a stream of a promise from the jQuery ajax call.


## Docs
- throttle:
	https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/throttle.md

- distinctUntilChanged:
	https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/distinctuntilchanged.md
	http://rxmarbles.com/#distinctUntilChanged

- flatMapLatest:
	https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/flatmaplatest.md


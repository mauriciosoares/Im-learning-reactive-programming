import Rx from 'rx';
import $ from 'jquery';

const API_URL = 'https://api.foursquare.com/v2/venues/suggestCompletion?intent=global&oauth_token=TS21NY0ZSEUAVRPA4Y4BQEHTOZFOICDEJMG131DOHN4FKU01&v=20150914';
// &query=foursqu

const input = document.querySelector('#search')

// we created an observer of the DOM event `keyup` from the
// #search element
// Everytime I typesomething, this stream is triggered if
// someone has subscribed to it.
let inputStream = Rx.Observable.fromEvent(input, 'keyup');

// Here I'm creating another stream of the dom event `keyup`,
// and I can filter the value a little bit, to improve
// the UX of the app
let valueStream = inputStream

  // only retrieve values after 250 of throttle
  // that means that the event won't fire if I keep
  // typing really fast
  .throttle(250)

  // return only the value of the target...
  .map((event) => event.target.value )

  // filter it to only trigger when there's 3 or more
  // characters in the value
  .filter((text) => text.length >= 3 )

  // this will trigger whenever the value is different from
  // the previous one
  // ex: If I clik in the arrow button is still a keyup event,
  // but the value has not changed.
  .distinctUntilChanged();

// Here I create the stream that actually fetches the foursquare API
let ajaxStream = valueStream

  // flatMapLatest guarantees that only the latest ajax
  // response will be triggered in the callback.
  // the searchFoursquare function is in the last lines of code.
  .flatMapLatest(searchFoursquare)

  // here I subscribe to all the streams that I created
  // previously. Without this line no code would actually run.
  .subscribe((result) => {
    console.log(result.response);
  });

// Here I create a function that returns a stream of
// a promise from the jQuery ajax call.
function searchFoursquare(term) {
  let promise = $.ajax({
    url: API_URL +  '&query=' + term
  }).promise();

  return Rx.Observable.fromPromise(promise);
}

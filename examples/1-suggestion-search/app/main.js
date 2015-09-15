import Rx from 'rx';
import $ from 'jquery';

const API_URL = 'https://api.foursquare.com/v2/venues/suggestCompletion?intent=global&oauth_token=TS21NY0ZSEUAVRPA4Y4BQEHTOZFOICDEJMG131DOHN4FKU01&v=20150914';
// &query=foursqu

const input = document.querySelector('#search')

let inputStream = Rx.Observable.fromEvent(input, 'keyup');

let valueStream = inputStream
  .throttle(250)
  .map((event) => event.target.value )
  .filter((text) => text.length >= 3 )
  .distinctUntilChanged();

let ajaxStream = valueStream
  .flatMapLatest(searchFoursquare)
  .subscribe((result) => {
    console.log(result.response);
  });


function searchFoursquare(term) {
  let promise = $.ajax({
    url: API_URL +  '&query=' + term
  }).promise();

  return Rx.Observable.fromPromise(promise);
}

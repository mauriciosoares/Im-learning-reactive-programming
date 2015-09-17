import Rx from 'rx';
import $ from 'jquery';

const API_URL = 'https://api.foursquare.com/v2/venues/suggestCompletion?intent=global&oauth_token=TS21NY0ZSEUAVRPA4Y4BQEHTOZFOICDEJMG131DOHN4FKU01&v=20150914';

const input = document.querySelector('#search')

let inputStream = Rx.Observable.fromEvent(input, 'keyup'); // #1

let valueStream = inputStream // #2
  .throttle(250) // #3
  .map((event) => event.target.value )
  .filter((text) => text.length >= 3 )
  .distinctUntilChanged(); // #4

let ajaxStream = valueStream // #5
  .flatMapLatest(searchFoursquare) // #6
  .subscribe((result) => { // #7
    console.log(result.response);
  });

function searchFoursquare(term) { // #8
  let promise = $.ajax({
    url: API_URL +  '&query=' + term
  }).promise();

  return Rx.Observable.fromPromise(promise);
}

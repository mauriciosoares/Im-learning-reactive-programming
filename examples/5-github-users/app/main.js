import Rx from 'rx';
import $ from 'jquery';

const API_URL = 'http://api.github.com/users';

var refreshButtonStream = Rx.Observable.fromEvent(document.querySelector('.refresh'), 'click');
var refreshUser1Stream = Rx.Observable.fromEvent(document.querySelector('.refresh-user1'), 'click');
var refreshUser2Stream = Rx.Observable.fromEvent(document.querySelector('.refresh-user2'), 'click');

var apiUrlStream = Rx.Observable.just(API_URL);

var requestOnRefreshStream = refreshButtonStream.map(ev => {
  return API_URL + '?since' + Math.floor(Math.random() * 500);
});

var responseStream = apiUrlStream
  .merge(requestOnRefreshStream)
  .flatMap((url) => {
    return Rx.Observable.fromPromise($.getJSON(url));
  })
  .shareReplay();

function createUserStream(refreshUserStream) {
  return responseStream
    .map(users => users[Math.floor(Math.random() * 30)])
    .merge(refreshButtonStream.map(ev => null))
    .merge(refreshUserStream.withLatestFrom(responseStream, (event, users) => users[Math.floor(Math.random() * 30)]))
    .startWith(null);
}

var user1Stream = createUserStream(refreshUser1Stream);
var user2Stream = createUserStream(refreshUser2Stream);

user1Stream.subscribe((user) => {
  fillUser('.user1', user);
});

user2Stream.subscribe((user) => {
  fillUser('.user2', user);
});

function fillUser(query, user) {
  var $el = $(query);

  if(!user) {
    $el.find('.name').html('');
    $el.find('.image').attr('src', '');
    return;
  }

  $el.find('.name').html(user.login);
  $el.find('.image').attr('src', user.avatar_url);
}

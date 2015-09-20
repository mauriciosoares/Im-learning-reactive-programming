## Comments

1. Create an array with the keycode sequences of a konami code

2. Create an observable from an array (yeah, you can create observables from basically anything, it helps you with some methods that only observers observables have).

3. Create an observable from the keyup event in the document, to trackdown all keyups.

4. Map all the keyups and returns only the keyCodes of each event.

5. windowWithCount returns a the last 10 streams combined , for example, if I type 1, 2 and 3, it will return [1], [1, 2], [1, 2, 3]. until it get's 10 items, then it starts to shift out the first ones.

6. flatMap enable us to return a new observable... in this case we're comparing the sequence of the `windowWithCount` method, and comparing to the codeStream. It returns true or false if they are equal.

7. filter out only the sequences that returns true.

8. We only the konami code to be executed once, so the `take` method stops the stream once it passes here.

## Docs
- from:
  https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/from.md

- windowWithCount
  https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/windowwithcount.md

- flatMap (it can be used as `selectMany` as well)
  https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/selectmany.md

- take
  https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/take.md
  http://rxmarbles.com/#take

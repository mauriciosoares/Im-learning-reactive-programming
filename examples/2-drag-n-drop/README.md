## Comments

1. First I get an observable from the mouse event (yeah, Rx is that powerfull)

2. I create another stream using flatMap, flatMap returns a stream of streams... this way you can merge down 2 different streams that serves the same purpose (like mouse down and mouse move [drag, duh!])

3. Here I'm returning a new stream, and mapping it to return only the new top and left of the element I'm dragging

4. takeUntil is used to stop the stream whenever the value it's passed is true... So when I have a mouseup in the document, the mousemove return stops.

5. I subscribe to the mouseDrag stream (otherwise it won't fire at all), and doing some logic to change the style of the html element. Here I get the value returned from the mouseMove stream.


## Docs
- flatMap:
	https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/selectmany.md

- takeUntil
	https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/takeuntil.md
	http://rxmarbles.com/#takeUntil

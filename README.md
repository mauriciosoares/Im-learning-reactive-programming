# I'm Learning Reactive Programming

My name is [Mauricio](http://twitter.com/omauriciosoares), and by the day this repository was created, I was a crap reactive programming developer!

Yeah, that's sad, but it's true... Nobody was born knowing everything, and the idea of this repo is to share everything I learn as I'm developing RP code...

I'll use the [Javascript ReactiveX library](https://github.com/Reactive-Extensions/RxJS) for this experiment. Javascript because is my strongest programming language, and [ReactiveX](http://reactivex.io/) because it seems to be the most popular RP library until now.

In the `examples` dir you'll find all the code I'm writting about RP, and for beginner RP developers, I'll keep everything as documented and well explained as I can.

Also I'll try to link the [documentation](https://github.com/Reactive-Extensions/RxJS/tree/master/doc) as much as possible, as well as the [rxmarbles](http://rxmarbles.com) website (which will help us to understand a lot of methods in RP).

## So, what the heck is Reactive Programming?

I'll try to explain here what I think reactive programming is, as I'm learning it...

*This was updated at October 3, 2015*

In short words, reactive programming is a way of programming using streams...

And what the hell is a stream? Streams are events that happens though time, and you trigger a callback when it happens.

It seems like a Promise, but different from promises, it's value can change over time. So you can think of it as a dynamic array that keeps incrementing.

You can illustrate streams using [marble diagrams](rxmarbles.com), like this:

--C---------C---->

Imagine that the line "-----" is the time, the ">" is the end of the stream, and the "C" may be anything, C can stand for clicks on a button.

So whenever I click on a button, a callback gets triggered with this event.

You can merge streams! So in case you want to merge 2 streams of clicks, it may become something like this:

--C---------C---->
      merge
------c--------c->
      result
--C---c-----C--c->

The third one (result) is a mix of all the click events that happened, it may seem simple using just a "clicks" example, but this can get as powerful as hell!

Yeah, that's it for now. :)

# beep beep boop!

A sequence memory game.

## how to play

Press 'Start' to start a new game.

The 9 buttons on the screen will flash in a specific, randomised order. Memorise the sequence, and press the buttons in the same order.

With every correctly pressed full sequence, the sequence will get longer and the buttons will flash in order again.

The game repeats until the player makes a mistake of pressing the wrong button!

## features

The 5 icons at the bottom screen modify the game or its UI in some way. Some will only apply to the next sequence or game, forcing a reset of the game.

1. Enable/ Disable game sounds
2. Light/ Dark mode
3. Restart the game
4. Enable/ Diable timed mode
   Repeat the sequence in the given time
5. 1x/ 2x Speed

# technologies used

This game was written in HTML, CSS, and JavaScript.

## general approach

My MVP - flashing a sequence on a screen, allowing the user to input a sequence, and finally checking whether or not the sequence matched.

I started by doing a quick **visual** sketch of how the screen should look and how I would divide it up to make the `<div>`s in _index.html_. I also named every single `<div>` in the sketch to help me organise things better. Then, I wrote the HTML file with the correct indentations.

Then, I styled each `<div>` to match the general layout of my sketch, by changing the display type and size of each one.

After having all the elements I needed in place, I started by writing a pseudocode of how the game should run, including the variables that I might need.

Then I wrote the code in js and I edit and see how :D

## sketches of wireframes

## major hurdles

1. Animating the button flashes and flashing them in sequence
   Making the next button flash happen only _after_ the previous button flash has ended was difficult. I started by using `setTimeout()` but ended up having many nested `setTimeout()` that were manually configured, which was not practical. `setInterval()` was the best solution to that, and I got inspiration from my coursemates who were discussing 1.6 homework's bonus question :D

# Frontend Project: Making use of a Live API to create a dynamic, responsive web page

This project required me to:

- incorporate event listeners,
- an AJAX call to an API,
- DOM manipulation based on user interaction with the app,
- and to get some decent-looking CSS laid down so the app actually looks like something you'd want to use.

The project was deployed to Surge, which I feel like is pretty cool and intuitive to use. Plus, can't beat that random-generated url [https://unhealthy-toes.surge.sh/](https://unhealthy-toes.surge.sh/).

## Creating the Idea for the App

I decided to build off of my Hackathon project for this one, in which I used the Band.js library to create a couple sound bytes and let the user play a dinky piano using their 10 home row keys on their keyboard.

## What This App Does

For this project, I wanted to take things a step further and use an API to **call up some sheet music in an iframe box that the user could follow along with while they play the piano in my app.**

I had to change my goals pretty quickly as I became familiar with the nature of free public APIs, so what I've ended up with is an app that **contains a "full-length" keyboard that the user can play** (although they will need to exercise their pinky a bit to switch between octaves).

And while it is apparently impossible to get sheet music pulled in via API, I was able to make use of [The Songsterr API](https://www.songsterr.com/a/wa/api) to **call down a link to one of their tablature sheets**. They have a pretty good database of music, and while it's all guitar tabs and thus pretty useless to the user, at least it's something to play along with.

## How to Use / Deploy This App

When the user loads the app, they will see two music history paragraphs, a couple pictures, and a couple buttons they can press to hear some hand-coded tunes exemplifying the music.

Then they scroll down, and see the piano. When they click on the iframe containing it, they're able to play the jankiest piano they've ever touched by using their own misaligned keyboard keys. The instructions are presented below the iframe in the bottom left.

In the bottom right, the user is encouraged to submit a search for a song or artist they know, which will present them with a list of options to choose from. Once they choose, they'll be given a link and instructed to open that link in a new tab side-by-side with the app, so they can play the music and see the tempo from Songsterr while they play along using the piano in the app.

## Issues and Lessons Learned

My first issue was discovering that there are no APIs for sheet music, which was really all I wanted to be able to do. In fact, I found out it's _very difficult_ to find a live API that's useful for more than a joke or niche interest. So I lost some time to that process before I settled on Songsterr.

Then I had to learn the hard way about `X-Frame-Options`, and how there [is no freedom on the internet](https://stackoverflow.com/questions/6663244/cant-show-some-websites-in-iframe-tag). I understand the intended purpose, I guess, but all those options have ever done for me is **make it impossible to use an iframe to bring up their chosen song tablature after they search for one using my app.**

_Any man who would sacrifice a little freedom for a little security gains neither, and loses both - Benjamin Franklin_

### So with that in front of me, I pivoted to making sure that my app (specifically, the piano) was as responsive to window size as it could be.

I briefly experimented with learning and making use of the [Bootstap CSS Library](https://getbootstrap.com/docs/3.4/css/) to assist with that, but I decided it wasn't something I wanted to try and implement while I was in the midst of this current project, **so I handled all of the CSS manually, which was painful.** The CSS rules may be the most difficult part of this entire project, ultimately.

- I did make use of [Colormind.io](http://colormind.io/bootstrap/) to get something like a unified color theme for my app, which was nice.

I stumbled upon a very well-written example of [how to create a functional piano](https://codepen.io/enteleform/pen/PepqYV) using HTML/CSS, but it made use of the SCSS pre-processor, which was a serious hindrance to getting a replicable result. After some effort, I was able to figure out how to basically reverse-engineer SCSS into regular CSS, and **I learned about the .root pseudo class and CSS variables along the way**

Part of that process was getting the piano to work, but only when you meant to be playing instead of typing in the input field. **I repurposed my iframe idea to hold the piano instead**, which solved that problem decently, could probably be better.

- The piano itself is held in its own HTML file, and interacts with its own specific keyboard-piano functionality Javascript.

Lastly, I **rigged up a way to show the user which piano key they've pressed** using the `toggleClass()` and `setTimout()` methods. Feedback is usually pretty nice to have, but especially when I've also **jury-rigged the piano to check if the user has pressed the Shift or Control keys, so that it can raise or lower the octave of the note respectively.**

### Any issues with the API AJAX call?

No, not really. I guess I expected more, but Songsterr's data results are very limited -- the user knows just about everything that Songsterr responds with in its JSON object, except for stuff like Songsterr's internal artist/song id numbers. _If I had more time, I would make sure there's a way for the user to cleanly and easily navigate through the search results_. It's a crowdsourced database, basically, if a person is willing to create a tab sheet to submit then they can. That explains how some artists can have a search result object of _500 elements_. So **I capped the results at 5** just to make sure I checked the box, for now.

The `<option>` and `<select>` elements threw me for a loop when I was trying to figure out how to pull the selected value using jQuery, but I was able to get that working. I also **picked up a couple tricks to have disabled, hidden text as the default value before the user makes a selection.**

Getting the results window to clear properly whenever the user made a new search or selected a different song from the presented list of options was also tricky, but I was able to put together the right combination of **iterative element creation using jQuery** along with **`remove()` calls tied to `change()` events** to get things working smoothly.

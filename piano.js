// Determine if shift or ctrl has been pressed, object of objects to allow octave control for notes
let shiftDown = false;
let controlDown = false;
let notes = {
  a: { note: "C", octave: "4" },
  w: { note: "C#", octave: "4" },
  s: { note: "D", octave: "4" },
  e: { note: "D#", octave: "4" },
  d: { note: "E", octave: "4" },
  f: { note: "F", octave: "4" },
  t: { note: "F#", octave: "4" },
  g: { note: "G", octave: "4" },
  y: { note: "G#", octave: "4" },
  h: { note: "A", octave: "4" },
  u: { note: "A#", octave: "4" },
  j: { note: "B", octave: "4" },
};

$(document).keydown(function (e) {
  let rawInput = e.key;
  let input = rawInput.toLowerCase(); //notes[e.key].note + notes[e.key].octave;

  if (input === "shift") {
    if (!shiftDown) {
      shiftDown = true;
    } else {
      shiftDown = false;
    }
  }

  if (input === "control") {
    if (!controlDown) {
      controlDown = true;
    } else {
      controlDown = false;
    }
  }

  if (input in notes) {
    if (shiftDown && !controlDown) {
      input = notes[input].note + "5";
    } else if (!shiftDown && controlDown) {
      input = notes[input].note + "3";
    } else {
      input = notes[input].note + notes[input].octave;
    }

    // Change background of pressed key, toggle back to regular background after 1 second
    $(`div[data-note="${input}"]`).toggleClass("keyIsDown");
    setTimeout(() => {
      $(`div[data-note="${input}"]`).toggleClass("keyIsDown");
    }, 1000);

    let conductor = new BandJS();
    let user = conductor.createInstrument("sine", "oscillators");
    user.setVolume(25);
    user.note("half", input);
    let player = conductor.finish();
    player.play();
  }
});

// Ghost mode // DO NOT TURN THIS ON UNLESS YOU WANT ISSUES
// $("body").keyup(function (e) {
//   let player = conductor.finish();
//   player.stop();
// });

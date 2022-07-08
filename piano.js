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
  console.log(e.key);
  let input = ""; //notes[e.key].note + notes[e.key].octave;

  if (e.key === "Shift") {
    if (!shiftDown) {
      shiftDown = true;
    } else {
      shiftDown = false;
    }
  }

  if (e.key === "Control") {
    if (!controlDown) {
      controlDown = true;
    } else {
      controlDown = false;
    }
  }

  if (e.key in notes) {
    if (shiftDown && !controlDown) {
      input = notes[e.key].note + "5";
    } else if (!shiftDown && controlDown) {
      input = notes[e.key].note + "3";
    } else {
      input = notes[e.key].note + notes[e.key].octave;
    }
    // if ($(`div[data-note="${input}"]`).hasClass("keyIsDown")) {

    // }
    $(`div[data-note="${input}"]`).toggleClass("keyIsDown");
    setTimeout(() => {
      $(`div[data-note="${input}"]`).toggleClass("keyIsDown");
    }, 1000);

    console.log("Trying to match input to piano key visual", $(`div[data-note="${input}"]`));

    let conductor = new BandJS();
    let user = conductor.createInstrument("sine", "oscillators");
    user.setVolume(25);
    user.note("half", input);
    let player = conductor.finish();
    player.play();
  }
});

// Ghost mode
// $("body").keyup(function (e) {
//   let player = conductor.finish();
//   player.stop();
// });

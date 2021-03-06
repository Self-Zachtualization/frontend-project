// To-do:
// Should ensure resizability to encourage side-by-side viewing of Songsterr page
// DONE Make sure entering text into input field does not fire keydown piano event
// Dress up page with info on selected song
// Make it possible to page through results instead of capping at 5
// Ensure CSS is fairly interactive and responsive
// DONE Possibly implement a representation of current note being played
// Audio visualizer?
// Way to hold a modifier button to change length of note played

// Create Classical music example and button for interaction
const $classicalButton = $(".classical-button");

$classicalButton.click(function () {
  let conductor = new BandJS();
  conductor.setTimeSignature(9, 8);
  conductor.setTempo(30);

  // Bar 1
  var leftTop = conductor.createInstrument("sine", "oscillators");
  var leftBot = conductor.createInstrument("sine", "oscillators");
  leftTop.setVolume(25);
  leftBot.setVolume(25);
  leftTop.rest("eighth");
  leftTop.note("quarter", "Ab3", true);
  leftTop.note("dottedHalf", "Ab3");

  leftBot.rest("eighth");
  leftBot.note("quarter", "F3", true);
  leftBot.note("dottedHalf", "F3");

  var rightTop = conductor.createInstrument("sine", "oscillators");
  var rightBot = conductor.createInstrument("sine", "oscillators");
  rightTop.setVolume(30);
  rightBot.setVolume(20);

  rightTop.rest("quarter");
  rightTop.note("eighth", "Ab4", true);
  rightTop.note("dottedQuarter", "Ab4");
  rightTop.note("dottedQuarter", "F4", true);

  rightBot.rest("quarter");
  rightBot.note("eighth", "F4", true);
  rightBot.note("dottedQuarter", "F4");
  rightBot.note("dottedQuarter", "Db4", true);

  // Bar 2
  leftTop.note("dottedHalf", "A3", true);
  leftTop.note("dottedQuarter", "A3");

  leftBot.note("dottedHalf", "Gb3", true);
  leftBot.note("dottedQuarter", "Gb3");

  rightTop.note("eighth", "F4");
  rightTop.note("eighth", "Eb4");
  rightTop.note("eighth", "F4");
  rightTop.note("dottedHalf", "Eb4");

  rightBot.note("eighth", "Db4");
  rightBot.note("eighth", "C4");
  rightBot.note("eighth", "Db4");
  rightBot.note("dottedHalf", "C4");

  let player = conductor.finish();
  player.play();
});

// Create Jazz example and button for interaction
const $jazzButton = $(".jazz-button");
$jazzButton.click(function () {
  let conductor = new BandJS();
  conductor.setTimeSignature(3, 4);
  conductor.setTempo(70);

  var trumpet = conductor.createInstrument("sawtooth", "oscillators");
  trumpet.setVolume(20);

  // Bar 1
  trumpet.note("dottedQuarter", "D4");
  trumpet.note("eighth", "C#4");
  trumpet.note("tripletEighth", "B3");
  trumpet.rest("tripletEighth");
  trumpet.note("tripletEighth", "A3");
  trumpet.note("tripletEighth", "F#3");
  trumpet.rest("tripletEighth");
  trumpet.note("tripletEighth", "D4");

  // Bar 2
  trumpet.note("tripletSixteenth", "C#4");
  trumpet.note("tripletSixteenth", "D4");
  trumpet.note("quarter", "C#4");
  trumpet.rest("eighth");
  trumpet.note("eighth", "B3");
  trumpet.note("dottedEighth", "A3");
  trumpet.note("sixteenth", "F#3");
  trumpet.note("tripletEighth", "D3");
  trumpet.note("tripletQuarter", "C#4");
  trumpet.note("quarter", "B3");

  let player = conductor.finish();
  player.play();
});

// Create Submit event handler for $.get AJAX call, append results
const $artistForm = $("#artist-form");
const $artistInput = $('input[name="search-artist"]');

$artistForm.submit((event) => {
  event.preventDefault();
  $(".results-window").empty();
  const userInput = $artistInput.val();
  if (userInput === "") {
    return;
  }
  const URL = `https://www.songsterr.com/a/ra/songs.json?pattern=${userInput}`;

  $.get(URL, (data) => {
    console.log(data, "This is the data");
    const n = data.length;
    const $label = $(`<label for="results">My search turned up the following:</label>`);
    $label.appendTo($(".results-window"));
    $(`<select class="results"></select>`).appendTo($(".results-window"));
    $(`<option value="none" selected disabled hidden>Select an Option</option>`).appendTo(".results");

    // Cap results to keep it concise and readable for user
    if (n > 0 && n < 5) {
      for (i = 0; i < n; i++) {
        $(`<option value="${data[i].id}">${data[i].title} by ${data[i].artist.name}</option>`).appendTo(
          ".results"
        );
      }
    } else if (n > 5) {
      alert(`There are too many results to show, here are the five most relevant search results`);
      for (i = 0; i < 5; i++) {
        $(`<option value="${data[i].id}">${data[i].title} by ${data[i].artist.name}</option>`).appendTo(
          ".results"
        );
      }
    }

    if ($(".results-window").is(":hidden")) {
      $(".results-window").fadeIn();
    }

    $(".results").change(() => {
      $("#workaround").remove();
      let $selected = $(".results").val();
      $(`<p id='workaround'></p>`)
        .html(
          `<a href="https://www.songsterr.com/a/wa/song?id=${$selected}" target="_blank">Open this in a new tab or window, then click back over here to try and play along!</a>`
        )
        .appendTo(".results-window");
    });
  });
});

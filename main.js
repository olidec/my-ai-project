// Classifier Variable
let classifier;
// Model URL
// Your Model URL goes here:
let imageModelURL = "https://teachablemachine.withgoogle.com/models/qZ_BrhkK3/";

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let opponent = "";
// let count;
// let showText = true;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

function setup() {
  createCanvas(1200, 800);
  background(100, 100, 100);

  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  flippedVideo = ml5.flipImage(video);
  // Start classifying

  // let button = createButton("Start Game");
  // button.position(width / 2, height - 50);
  // button.mousePressed(startGame);
}

function draw() {
  background(100);
  // Draw the video
  image(flippedVideo, 0, 0);

  // Draw the label
  // fill(255);
  // textSize(16);
  // textAlign(CENTER);
  // text(label, width / 2, height - 4);

  // countdown();

  // Draw the opponent's move
  fill(255);
  textAlign(CENTER);
  // textSize(300);
  // if (showText) {
  //   text(count, width / 2, height / 2);
  // }
  textSize(200);
  text(opponent, width / 2, height / 2);

  // text(count, width / 2, height / 2);
}

// function countdown() {
//   for (let i = 0; i <= 3; i++) {
//     setTimeout(() => {
//       count = 3 - i;
//       textSize(300);
//       textAlign(CENTER);
//       // text(count, width / 2, height / 2);
//       // showText = false;
//     }, 1000 * i);
//   }
// }

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
  flippedVideo.remove();
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  if (label === "Stein") {
    opponent = "📃";
  } else if (label === "Schere") {
    opponent = "🪨";
  } else if (label === "Papier") {
    opponent = "✂️";
  }
  // Classifiy again!
  classifyVideo();
}

// startGame = () => {
//   image(flippedVideo, 0, 0);
//   // countdown();
//   // classifyVideo();
//   // video.stop();
// };

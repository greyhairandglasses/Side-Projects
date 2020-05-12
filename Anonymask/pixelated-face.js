const video = document.querySelector('.webcam');
const videoCanvas = document.querySelector('.video');
const videoCtx = videoCanvas.getContext('2d');
const faceCanvas = document.querySelector('.face');
const faceCtx = faceCanvas.getContext('2d');

// -------------------------------------------
const dogEmoji = document.querySelector('.dog');
// -------------------------------------------

const options = { SIZE: 8, SCALE: 1.35 };
const optionControls = document.querySelectorAll(
  '.controls input[type="range"]'
);
function handler(e) {
  const { value, name } = e.currentTarget;
  options[name] = value;
}
optionControls.forEach(slider => slider.addEventListener('input', handler));

const faceDetector = new window.FaceDetector();
console.log(video, videoCanvas, faceCanvas, faceDetector);

async function populateVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720 },
  });
  video.srcObject = stream;
  await video.play();
  console.log(video.videoWidth, video.videoHeight);
  videoCanvas.width = video.videoWidth;
  videoCanvas.height = video.videoHeight;
  faceCanvas.width = video.videoWidth;
  faceCanvas.height = video.videoHeight;
}

async function detect() {
  const faces = await faceDetector.detect(video);
  console.log(faces.length);
  // Loop runs over the detected faces and draws the box
  faces.forEach(drawFace);
  // Loops over each face and renders the censorship box
  faces.forEach(censor);
  // Ask the browser when the animation frame is, and tell it to run detect for us
  requestAnimationFrame(detect);
}

function drawFace(face) {
  // destructoring the boundingBox
  const { width, height, top, left } = face.boundingBox;
  // Clearing each box before rendering another, to prevent multiple drawings on screen
  videoCtx.clearRect(0, 0, videoCanvas.width, videoCanvas.height);
  // Styling the lines of the rendered box
  videoCtx.strokeStyle = '#ffc600';
  videoCtx.lineWidth = 2;
  // Drawing the box over the face
  videoCtx.strokeRect(left, top, width, height);
}

function censor({ boundingBox: face }) {
  // Prevent image smoothing, which helps with the pixelated look we're goin for
  faceCtx.imageSmoothingEnabled = false;
  faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
  // The below takes a snapshot of the detected face
  // Saves it as a small copy, ready to be resized larger to pixelate
  faceCtx.drawImage(
    // 5 Source arguments
    video, // Where does the source come from
    face.x, // What location of the source video do we start at
    face.y,
    face.width,
    face.height,
    // 4 draw arguments
    face.x, // Where do we start to DRAW the X & Y?
    face.y,
    options.SIZE,
    options.SIZE
  );
  const width = face.width * options.SCALE;
  const height = face.height * options.SCALE;
  // Pixelates the saved image of the smaller face by increasing its size
  faceCtx.drawImage(
    faceCanvas,
    face.x,
    face.y,
    options.SIZE,
    options.SIZE,
    face.x - (width - face.width) / 2,
    face.y - (height - face.height) / 2,
    width,
    height
  );
}

populateVideo().then(detect);

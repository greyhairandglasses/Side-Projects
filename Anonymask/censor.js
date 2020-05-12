const video = document.querySelector('.webcam');
const videoCanvas = document.querySelector('.video');
const videoCtx = videoCanvas.getContext('2d');
const faceCanvas = document.querySelector('.face');
const faceCtx = faceCanvas.getContext('2d');
let faceCovering = video;

const emojiList = document.querySelectorAll('.emoji');
function changeEmoji(e) {
  faceCovering = e.path[0];
}
emojiList.forEach(emoji => emoji.addEventListener('click', changeEmoji));

const faceDetector = new window.FaceDetector();
// console.log(video, videoCanvas, faceCanvas, faceDetector);

async function populateVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720 },
  });
  video.srcObject = stream;
  await video.play();
  // console.log(video.videoWidth, video.videoHeight);
  videoCanvas.width = video.videoWidth;
  videoCanvas.height = video.videoHeight;
  faceCanvas.width = video.videoWidth;
  faceCanvas.height = video.videoHeight;
}

async function detect() {
  const faces = await faceDetector.detect(video);
  faces.forEach(censor);
  faces.forEach(drawFace);
  requestAnimationFrame(detect);
}

function drawFace(face) {
  // destructoring the boundingBox
  const { width, height, top, left } = face.boundingBox;
  // Clearing each box before rendering another, to prevent multiple drawings on screen
  videoCtx.clearRect(0, 0, videoCanvas.width, videoCanvas.height);
  // Styling the lines of the rendered box
  videoCtx.strokeStyle = '#ffc60000';
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
  if (faceCovering === video) {
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
      8,
      8
    );
    faceCtx.drawImage(
      faceCanvas,
      face.x,
      face.y,
      8,
      8,
      face.x - 75, // H - Where to start
      face.y - 75, // V - Where to start
      face.width + 150, // How big
      face.height + 150 // How big
    );
  } else {
    faceCtx.drawImage(
      faceCovering, // Where does the source come from
      0,
      0,
      512,
      512,
      face.x - 75, // H - Where to start
      face.y - 75, // V - Where to start
      face.width + 150, // How big
      face.height + 150 // How big
    );
  }
}

populateVideo().then(detect);

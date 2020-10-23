// Selectors
const video = document.querySelector('.webcam');
const videoCanvas = document.querySelector('.video');
const videoCtx = videoCanvas.getContext('2d');
const faceCanvas = document.querySelector('.face');
const faceCtx = faceCanvas.getContext('2d');
let faceCovering = null;

// Selects each emoji as an object so that the drawImage function can use it
// If you just select the src it's stored as a string and can't be used in drawImage
const emojiList = document.querySelectorAll('.emoji');
function changeEmoji(e) {
  if (e.path[0].alt !== 'Stop Sign Emoji') {
    faceCovering = e.path[0];
  } else {
    faceCovering = null;
  }
}
emojiList.forEach(emoji => emoji.addEventListener('click', changeEmoji));
emojiList.forEach(emoji => emoji.addEventListener('ontouchstart', changeEmoji));

// Creates an instance of the FaceDetector
const faceDetector = new window.FaceDetector();
// console.log(video, videoCanvas, faceCanvas, faceDetector);

// Grabs the webcam footage and puts it onto the video and canvas elements
// async/await used to allow for the time it takes for the webcam to actually kick in
async function populateVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720 },
  });
  video.srcObject = stream;
  await video.play();
  videoCanvas.width = video.videoWidth;
  videoCanvas.height = video.videoHeight;
  faceCanvas.width = video.videoWidth;
  faceCanvas.height = video.videoHeight;
}

// Awaits a face to enter the video to detect
async function detect() {
  const faces = await faceDetector.detect(video);
  faces.forEach(censor);
  requestAnimationFrame(detect);
}


// Puts the emoji over the face
function censor({ boundingBox: face }) {
  // The below clears the previous frames emoji, without this the emoji would be printed to the canvas and stay there
  // Meaning you'd end up with just a mess of stacked emojis on the screen
  faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
  // If faceCovering isn't null it'll put the emoji onto the face, otherwise it'll not put anything on the face
  if (faceCovering !== null) {
    faceCtx.drawImage(
      faceCovering, // Where does the source come from, this has to be an HTML element and not a string
      0, // These two zeros represent where in the source image would you like to start drawing from, which 0 0 means top left corner (to get the whole img)
      0,
      512, // The two 512s are how far into the image would you like to draw to. The emojis are 512 x 512 and I want the whole emoji drawn.
      512,
      face.x - 75, // H - Where to put the top corner of the image, I've used negative values here to allow for the image being a bit bigger than the box around the face
      face.y - 75, // V 
      face.width + 150, // This is how big should the image be, I've chosen to go larger than the face to completely cover it
      face.height + 150 // 
    );
  } 
}

populateVideo().then(detect);

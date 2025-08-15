let canvas;
let ctx;
let flowField;
let flowFieldAnimation;

window.onload = function () {
  canvas = document.querySelector("#canvas1");
  ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
  flowField.animate(0);

  runFaceDetection(); // start face tracking after artwork setup
};

window.addEventListener("resize", function () {
  cancelAnimationFrame(flowFieldAnimation);
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  flowField = new FlowFieldEffect(ctx, canvas.width, canvas.height);
  flowField.animate(0);
});

// this will now be set by face detection
const mouse = {
  x: window.innerWidth / 2,
  y: window.innerHeight / 2,
};

// For smoothing
let targetX = mouse.x;
let targetY = mouse.y;
const smoothingFactor = 0.1; // 0.1 = slow & smooth, 1 = instant

// FLOW FIELD CLASS
class FlowFieldEffect {
  #ctx;
  #width;
  #height;
  constructor(cta, width, height) {
    this.#ctx = cta;
    this.#ctx.strokeStyle = "#fff";
    this.#ctx.lineWidth = 2;
    this.#width = width;
    this.#height = height;
    this.lastTime = 0;
    this.interval = 1000 / 60;
    this.timer = 0;
    this.cellSize = 15;
  }
  #drawLine(x, y) {
    this.#ctx.beginPath();
    this.#ctx.moveTo(x, y);
    this.#ctx.lineTo(mouse.x, mouse.y);
    this.#ctx.stroke();
  }
  animate(timeStamp) {
    const deltaTime = timeStamp - this.lastTime;
    this.lastTime = timeStamp;

    // Smooth movement update here
    mouse.x += (targetX - mouse.x) * smoothingFactor;
    mouse.y += (targetY - mouse.y) * smoothingFactor;

    if (this.timer > this.interval) {
      this.#ctx.clearRect(0, 0, this.#width, this.#height);
      for (let y = 0; y < this.#height; y += this.cellSize) {
        for (let x = 0; x < this.#width; x += this.cellSize) {
          this.#drawLine(x, y);
        }
      }
      this.timer = 0;
    } else {
      this.timer += deltaTime;
    }
    flowFieldAnimation = requestAnimationFrame(this.animate.bind(this));
  }
}

// FACE DETECTION FUNCTION
async function runFaceDetection() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false,
  });
  const videoFeedEl = document.querySelector("#video-feed");
  videoFeedEl.srcObject = stream;

  await Promise.all([
    faceapi.nets.ssdMobilenetv1.loadFromUri("./models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("./models"),
  ]);

  const detectionCanvas = document.getElementById("face-canvas");
  detectionCanvas.style.left = videoFeedEl.offsetLeft + "px";
  detectionCanvas.style.top = videoFeedEl.offsetTop + "px";
  detectionCanvas.height = videoFeedEl.height;
  detectionCanvas.width = videoFeedEl.width;

  setInterval(async () => {
    let faceAIData = await faceapi
      .detectAllFaces(videoFeedEl)
      .withFaceLandmarks();

    const ctx = detectionCanvas.getContext("2d");
    ctx.clearRect(0, 0, detectionCanvas.width, detectionCanvas.height);

    faceAIData = faceapi.resizeResults(faceAIData, videoFeedEl);
    faceapi.draw.drawDetections(detectionCanvas, faceAIData);
    faceapi.draw.drawFaceLandmarks(detectionCanvas, faceAIData);

    if (faceAIData.length > 0) {
      const box = faceAIData[0].detection.box;
      let faceCenterX = box.x + box.width / 2;
      let faceCenterY = box.y + box.height / 2;

      // Map video coords to window coords
      let scaleX = window.innerWidth / videoFeedEl.videoWidth;
      let scaleY = window.innerHeight / videoFeedEl.videoHeight;

      // Set as the new target for smoothing
      // Flip horizontally so head movement matches visual movement
      targetX = (videoFeedEl.videoWidth - faceCenterX) * scaleX;
      targetY = faceCenterY * scaleY;
    }
  }, 100);
}

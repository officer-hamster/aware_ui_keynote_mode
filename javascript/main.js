let facemesh;
let video;
let predictions = [];
let eyepoints;
let div;
let distance;
let objectDistance = 0;
let postDistance = 0;
let circle = true;
let square = true;
let laut = true;
let fadeTimer = true;
let viewState = "keinFokus"

let wrapper = $('#wrapper')

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function setup() {
  createCanvas(0, 0);

  video = createCapture(VIDEO);
  video.size(width, height);

  facemesh = ml5.facemesh(video);

  facemesh.on("predict", results => {
    predictions = results;
  });

  video.hide();
}

function draw() {
  if (stageCounter === 0) {
    if (switchCase) {

      console.log("stage1")
    }
    switchCase = false;
  }
  if (stageCounter === 1) {
    if (switchCase) {
      moveToCenter();
      console.log("stage1")
    }
    switchCase = false;
  }
  if (stageCounter === 2) {
    if (switchCase) {
      breathe();
      console.log("stage2")
    }
    switchCase = false;
  }
  if (stageCounter === 3) {
    if (switchCase) {
      console.log("stage3")
      stopBreathe();
    }
    switchCase = false;
  }
  if (stageCounter === 4) {
    if (switchCase) {
      console.log("stage1")
      moveDotToSide();
      setTimeout(openWindow, 1500);
      setTimeout(showHeading, 2500);
    }
    switchCase = false;
  }
  if (stageCounter === 5) {
    if (switchCase) {
      breathe2();
    }
    switchCase = false;
  }
  // image(video, 0, 0, width, height);
  // drawKeypoints();

  // Muss aktiv bleiben, um Distanz zu berechnen
  getDistance();

  
  handMusicToggle();
  awareness();
}

function showCircle() {

  if (circle === true) {
    div = document.createElement('Circle');
    div.setAttribute("class", "theCircle");
    document.body.appendChild(div);
    div.circleRadius = 60;

    circle = false;
  }

  document.getElementById('startButton').style.display = "none";
  document.getElementById('description').style.display = "none";

  // if (predictions[0].faceInViewConfidence === 'undefined') {
  //   console.log("kein gesicht");
  // }
  if (predictions[0]) {

    // wenn nah dran/im fokus
    if (predictions[0].faceInViewConfidence == 1 && objectDistance < 80) {
      // console.log("fokus");
      div.style.bottom = "50%";
      div.style.marginBottom = -div.circleRadius / 2 + "vh";

      // wenn weit weg/nicht im fokus
    } else if (predictions[0].faceInViewConfidence == 1 && objectDistance > 80) {
      // console.log("außer fokus");
      div.style.marginBottom = -div.circleRadius / 2 + "vh";
      div.style.bottom = 0;
      div.style.top = "auto";
      div.style.marginTop = "auto";

      // wenn gesicht nicht erkannt
    } else if (predictions[0].faceInViewConfidence != 1) {
      // console.log("kein gesicht");
      div.style.marginBottom = -div.circleRadius + "vh";
      div.style.bottom = 0;
      // div.style.bottom = "auto";
      // div.style.marginTop = -div.circleRadius / 2 + "vh";
      // div.style.top = "50%";
    }

    eyepoints = predictions[0].annotations.midwayBetweenEyes;
    eyepointsX_mapped = map_range(eyepoints[0][0], width, 0, 0, 100)
    eyepointsY_mapped = map_range(eyepoints[0][1], height, 0, 0, 100)

    if (eyepointsX_mapped < 20) {
      div.style.marginLeft = -div.circleRadius + "vh";
    } else if (eyepointsX_mapped > 20 && eyepointsX_mapped < 80) {
      div.style.marginLeft = -div.circleRadius / 2 + "vh";
    } else if (eyepointsX_mapped > 80) {
      div.style.marginLeft = 0;
    }
  }
}

function scaleText() {

  let difference = Math.abs(postDistance - objectDistance)
  console.log(difference);

  if (difference > 10) {
    document.getElementById('startButton').style.display = "none";
    document.getElementById('description').style.fontSize = map_range(objectDistance, 100, 10, 100, 12);
    postDistance = objectDistance;
  }
}


function distanceAppear() {
  if (objectDistance < 40) {
    document.getElementById('description').style.opacity = 1.0;
  } else if (objectDistance > 40) {
    document.getElementById('description').style.opacity = 0;
  }
}

function moveSquare() {
  if (square === true) {
    div = createDiv("I am an AI following your Head.")
    div.class("theSquare")
    div.parent("wrapper")

    square = false;
  }

  document.getElementById('startButton').style.display = "none";
  document.getElementById('description').style.display = "none";
  document.getElementById("wrapper").style.transform = "scale(-1, 1)";

  for (let i = 0; i < predictions.length; i += 1) {
    eyepoints = predictions[i].annotations.midwayBetweenEyes
  }

  if (eyepoints) {
    eyepointsX_mapped = map_range(eyepoints[0][0], 0, width, 0, window.innerWidth)
    eyepointsY_mapped = map_range(eyepoints[0][1], 0, height, 0, window.innerHeight)
    eypointsX_rotate_mapped = map_range(eyepoints[0][0], 0, width, -80, 80)
    eypointsY_rotate_mapped = map_range(eyepoints[0][1], 0, height, -50, 50)
    // div.style('transform', "translate(-50%, -50%) rotateY(" + eypointsX_rotate_mapped + 'deg) rotateX(' + eypointsY_rotate_mapped + 'deg)');
    div.style('transform', "translate(-50%, -50%) rotate3d(0, 1, 0, " + eypointsX_rotate_mapped + 'deg) scale(-1, 1)');
    div.style('opacity', '1');
    div.position(eyepointsX_mapped, eyepointsY_mapped)
  }
}

function getDistance() {

  // pixel density macbook pro 13 2020 227ppi
  // 227 px = 1 inch = 2,54cm
  // 89 px = 1cm
  // 1 px = 1/89 cm
  // 100px = 1,12cm

  // 100px = 1,12cm = breite des objects im Bild =  w 
  // 10cm = breite in der Realität = W
  // 35cm = Distanz zwischen Objekt und Kamera = d
  // focal length = (w*d)/W = 39,2/10 = 3,92cm

  // d = (W*f)/w


  for (let i = 0; i < predictions.length; i += 1) {
    cheeckDistance = predictions[0].annotations.leftCheek[0][0] - predictions[0].annotations.rightCheek[0][0]
    let cheeckDistance_cm = cheeckDistance / 89

    objectDistance = 39.2 / cheeckDistance_cm
    // console.log(objectDistance)
    distance = objectDistance;
    // console.log(distance)

  }
}

function handMusicToggle() {

  if (predictions[0]) {
    if (distance < 60 && predictions[0].faceInViewConfidence != 1) {
      // fadeInToggle();
      // console.log("handgeste")
    }
  }
}


function switchFadeTimer() {
  fadeTimer = true;
}

function awareness() {
  if (predictions[0]) {
    if (predictions[0].faceInViewConfidence === 1) {
      viewState = "fokus"
      if (fadeTimer === true) {
      if (laut === true) {
        console.log("fokus")

        wrapper.css({
          backgroundColor: "white"
        })
        
          lowerVolume();
          laut = false;
          fadeTimer = false;
          setTimeout(switchFadeTimer, 1000);
        }
      }
    }
  }
  if (predictions[0]) {
    if (predictions[0].faceInViewConfidence != 1) {
      if (fadeTimer === true) {
      if (laut === false) {
        viewState = "keinFokus";
        console.log("kein fokus")

        wrapper.css({
          backgroundColor: "black"
        })
        
        upperVolume();
        laut = true;
        fadeTimer = false;
          setTimeout(switchFadeTimer, 1000);
        }
      }
    }
  }
}

function showDistance() {
  document.getElementById("wrapper").innerHTML = "Distanz beträgt " + Math.trunc(objectDistance) + "cm.";
  // console.log(objectDistance)
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    // const keypoints = predictions[i].scaledMesh;
    eyepoints = predictions[i].annotations.midwayBetweenEyes

    // Draw facial keypoints.
    // for (let j = 0; j < keypoints.length; j += 1) {
    //   const [x, y] = keypoints[j];

    //   fill(0, 255, 0);
    //   ellipse(x, y, 5, 5);
    // }
  }
}
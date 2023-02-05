let stageCounter = 0;
let slideCounter = 0;
let state = false;
let slide3 = false;
let switchCase = true;

window.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) {
        return; // Do nothing if event already handled
    }

    switch (event.code) {
        case "Digit1":
            $('#wrapper').css({
                opacity:1
            })
            slideCounter = 1
            console.log("slidecounter: " + slideCounter);

            $('#001').css({
                opacity: "1"
            });
            $('#002').css({
                opacity: "0"
            });
            $('#0031').css({
                opacity: "0"
            });
            $('#0032').css({
                opacity: "0"
            });
            slide3 = false;

            break;
        case "Digit2":
            $('#wrapper').css({
                opacity:1
            })
            slideCounter = 2
            console.log("slidecounter: " + slideCounter);

            $('#001').css({
                opacity: "0"
            });
            $('#002').css({
                opacity: "1"
            });
            $('#0031').css({
                opacity: "0"
            });
            $('#0032').css({
                opacity: "0"
            });


            break;
        case "Digit3":
            $('#wrapper').css({
                opacity:1
            })
            slideCounter = 3
            console.log("slidecounter: " + slideCounter);

            $('#001').css({
                opacity: "0"
            });
            $('#002').css({
                opacity: "0"
            });
            $('#0031').css({
                opacity: "1"
            });
            $('#0032').css({
                opacity: "1"
            });


            if (slide3) {
                if (state == true) {
                    $('#0032').css({
                        left: 0
                    });
                    state = false;
                    console.log(state)
                } else if (state == false) {
                    $('#0032').css({
                        left: "-60vw"
                    });
                    state = true;
                    console.log(state)
                }
            }

            slide3 = true;

            break;
        case "Digit4":
            slideCounter = 4
            console.log("slidecounter: " + slideCounter);
            $('#wrapper').css({
                opacity:0
            })
            break;
        case "Digit5":
            slideCounter = 5
            console.log("slidecounter: " + slideCounter);

            break;
        case "Digit6":
            slideCounter = 6
            console.log("slidecounter: " + slideCounter);

            break;
        case "KeyS":
        case "ArrowDown":
            moveDotToSide();
            setTimeout(openWindow, 1500);
            setTimeout(showHeading, 2500);
            break;
        case "KeyW":
        case "ArrowUp":
            // Handle "forward"
            break;
        case "KeyA":
        case "ArrowLeft":
            stageCounter--
            if (stageCounter < 0) {
                stageCounter = 0
            }
            console.log("stageCounter: " + stageCounter);
            switchCase = true;
            break;
        case "KeyD":
        case "ArrowRight":
            stageCounter++
            if (stageCounter > 5) {
                stageCounter = 5
            }
            console.log("stageCounter: " + stageCounter);
            switchCase = true;
            break;
    }
})


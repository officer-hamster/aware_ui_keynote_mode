let dot = $('#dot')
let window1 = $('#window')
console.log('hi')

function moveToCenter() {

    $('.cloudDot').animate({
        top: window.innerHeight / 2 - 400 + "px",
        left: window.innerWidth / 2 - 400 + "px",
        margin: "auto",
        width: "800px",
        height: "800px",
        borderRadius: "100%"
    }, 1000)

    dot.css({
        opacity: 1
    })

    setTimeout(fadeClouds, 2000)
    // setTimeout(hideClouds, 2000)
}

function fadeClouds() {
    $('#cloudDot1').animate({
        backgroundColor: "rgb(163, 163, 163)",
        AnimationPlaybackEvent: "paused",
        transform: "scale(0)",
    })
    $('#cloudDot2').animate({
        backgroundColor: "rgb(163, 163, 163)",
        AnimationPlaybackEvent: "paused",
        transform: "scale(0)",
    })
    $('#cloudDot3').animate({
        backgroundColor: "rgb(163, 163, 163)",
        AnimationPlaybackEvent: "paused",
        transform: "scale(0)",
    })
    $('#cloudDot4').animate({
        backgroundColor: "rgb(163, 163, 163)",
        AnimationPlaybackEvent: "paused",
        transform: "scale(0)",
    })

}

function hideClouds() {
    $('.cloudDot').css({
        visibility: "hidden"
    })
}

function openWindow() {
    window1.addClass('window_open')
}

function breathe() {
    dot.animate({
        opacity: 0,
    }, 1000)
    $('#dot2').animate({
        opacity: 1
    }, 500)
    $('#dot2').addClass('breathe_animation')
    setTimeout(hideClouds, 1000)
}

function breathe2() {
    dot.animate({
        opacity: 0,
    }, 1500)
    $('#dot2').animate({
        width: "800px",
        height: "800px",
        opacity: 1
    }, 1500)
    $('#dot2').addClass('breathe_animation')
    setTimeout(hideClouds, 1000)
}

function stopBreathe() {
    dot.animate({
        opacity: 1,
        width: "800px",
        height: "800px",
        animation: "none"
    }, 200)
    $('#dot2').animate({
        width: "50px",
        height: "50px",
        opacity: 0,
    }, 200)
}

function openWindow() {
    $('#dotAnimation').css({
        width: "2000px",
        height: "2000px",
    })
}

function showHeading() {
    $('#heading').animate({
        opacity: 1
    },500)
    $('#text').animate({
        opacity: 1
    },500)
}

function moveDotToSide(){
    dot.css({
        left: "45vw"
    })
    $('#dot2').css({
        left: "45vw"
    })
}




// let spotifyToggle = document.getElementById('spotify_toggle')
// spotifyToggle.onclick = function () {
//     player.togglePlay();
//     setTimeout(fadeOutToggle, 1000);
// };


let player;
window.onSpotifyWebPlaybackSDKReady = () => {
    const token = 'your_token';
    player = new Spotify.Player({
        name: 'aware_ui_playback',
        getOAuthToken: cb => {
            cb(token);
        },
        volume: 1
    });

    // Ready
    player.addListener('ready', ({
        device_id
    }) => {
        console.log('Ready with Device ID', device_id);
    });

    // Not Ready
    player.addListener('not_ready', ({
        device_id
    }) => {
        console.log('Device ID has gone offline', device_id);
    });

    player.addListener('initialization_error', ({
        message
    }) => {
        console.error(message);
    });

    player.addListener('authentication_error', ({
        message
    }) => {
        console.error(message);
    });

    player.addListener('account_error', ({
        message
    }) => {
        console.error(message);
    });

    player.connect();
}


// function hideToggle() {
//     let toggleWrapper = document.getElementById("toggleWrapper");
//     toggleWrapper.style.visibility = "hidden";
//   }


// function fadeOutToggle(){
//     let toggleWrapper = document.getElementById("toggleWrapper");
//     toggleWrapper.style.opacity = "0";

//     setTimeout(hideToggle, 500);
// }

// function fadeInToggle(){
//     let toggleWrapper = document.getElementById("toggleWrapper");
//     toggleWrapper.style.visibility = "visible";
//     toggleWrapper.style.opacity = "1";
// }

function lowerVolume(){
    var easing = BezierEasing(0.25, 0.1, 0.25, 1.0);
    var volume = 1;
    var targetVolume = 0.3;
    var duration = 1000; // 5 seconds
    var startTime = Date.now();
    var interval = setInterval(function() {
        var currentTime = Date.now();
        var progress = (currentTime - startTime) / duration;
        var easedProgress = easing(progress);
        if (progress >= 1) {
            clearInterval(interval);
            player.setVolume(targetVolume);
        } else {
            player.setVolume(volume + (targetVolume - volume) * easedProgress);
        }
    }, 50);
}

function upperVolume(){
    var easing = BezierEasing(0.25, 0.1, 0.25, 1.0);
    var volume = 0.3;
    var targetVolume = 1;
    var duration = 1000; // 5 seconds
    var startTime = Date.now();
    var interval = setInterval(function() {
        var currentTime = Date.now();
        var progress = (currentTime - startTime) / duration;
        var easedProgress = easing(progress);
        if (progress >= 1) {
            clearInterval(interval);
            player.setVolume(targetVolume);
        } else {
            player.setVolume(volume + (targetVolume - volume) * easedProgress);
        }
    }, 50);
}
# Aware UI README

**With Aware UI, we are combining differnent machine learning functions to create a UI that can be interacted with as "naturally" as possible. That is by being able to talk to it by just facing the screen (no hotword needed). Also, we want to dynamically show information based on the position of the user in the room. Aware UI is a coding project from Malte Fial and Johannes Rothkegel. It is part of a coding course at the HfG Schwäbisch Gmünd (Design university).**

This is a version of Aware UI designed to present its functions as a Keynote. 
It contains all working functions for the final product.

These are the working functions of Aware UI:

#### main.js

	▪	Detection of a human Face in FOV
	▪	Measuring the approx. distance between the Screen and the Face
	▪	Detection if Face is focusing screen (simulation, works on approx 60cm distance, actually measures distance between left and right cheek)

#### spotify.js

	▪	uses spotify web playback sdk 
	▪	enables music controls

#### voice.js

	▪	enables voice control („musik aus“)

#### controls.js

	▪	these are the keyboard controls for the keynote
	▪	some controls are also found in the draw() function of main.js

#### animation.js

	▪	functions for animating the GUI of Aware UI, css based.
  


### Requirements



#### Spotify

you will need to be logged into your spotify account on the browser you are running the code on. 

also, you will need to create an access token (https://developer.spotify.com/documentation/web-playback-sdk/quick-start/#) 

the access token has to be pasted into line 13 in spotify.js

#### Camera/Microphone
You will need a working camera and mic - and allow access for your browser.


#### Scripts
some of the scripts are weblinks. you will need a working internet connection. 


### Functionality

As already mentioned, this is intended to be a keynote. 

the keynote has 3 stages that can be triggered.

#### stage 1
default stage when you run the code. 
you can run music on your device using spotify: just select „aware_ui_playback“ as a spotify connect output.

it will detect your face and change the background color depending on where you are heading to.
best if you sit about 1m away from your screen. 

also, the UI will „listen“ to you, while you are facing the screen. 
if you are running music via spotify („aware_ui_playback“), the music volume will change depending on your focus. 
while facing the screen, you can say „musik aus“ and the music will turn of. this only works one time, you will have to 
resfresh the page if you want to do it again.


#### stage 2
can be triggered by pressing „1“ on your keyboard. 
these are the actual keynote slides.

you can just jump between them by pressing „1“, „2“ or „3“ on your keyboard.
„3“ can be pressed twice to move the table. 

#### stage 3
can be triggered by pressing „4".

the GUI of Aware UI appears. 

you can demo/trigger the different animations of the GUI by pressing „arrow-right“ button several times. 

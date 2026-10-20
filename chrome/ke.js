if (window == top) {
	window.addEventListener('keydown', doKeyPressinc, false);
	window.addEventListener('keydown', doKeyPressdec, false);
}

// Set once YouTube's own > handler has reached 2x, so that press isn't counted twice.
var c = 0;

function doKeyPressinc(e){
	// Handle setting faster playback rate only when playback reaches 2x.
	// If playback rate is >=2x, pressing < goes straight to 1.75x. That's YouTube.

	if (e.key != '>') { return; }
	var video = document.getElementsByClassName("video-stream html5-main-video")[0];
	if (video.playbackRate < 2.) {
		c = 0;
		return;
	}
	if (c == 0) {
		// This press is the one YouTube used to go from 1.75x to 2x.
		c = 1;
		return;
	}
	var pr = video.playbackRate += .25;

    // console.log('Pressed '+e.key+' PR: '+pr);

	var box = document.getElementsByClassName("ytp-bezel-text-wrapper")[0];
	box.children[0].innerText = pr + 'x';
	box.parentElement.style = "";
	window.setTimeout(function(){ box.parentElement.style = "display:none"; }, 500);
}

function doKeyPressdec(e){
	if (e.key != '<') { return; }
	c = 0;
}

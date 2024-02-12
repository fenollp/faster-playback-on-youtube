if (window == top) {
	window.addEventListener('keyup', doKeyPress, false);
}

function doKeyPress(e){
	// Handle setting faster playback rate only when playback reaches 2x.
	// If playback rate is >=2x, pressing < goes straight to 1.75x. That's YouTube.

	if (e.key != '>') { return; }
	var video = document.getElementsByClassName("video-stream html5-main-video")[0];
	if (video.playbackRate < 2.) { return; }
	var pr = video.playbackRate += .25;

    // console.log('Pressed '+e.key+' PR: '+pr);

	var box = document.getElementsByClassName("ytp-bezel-text-wrapper")[0];
	box.children[0].innerText = pr + 'x';
	box.parentElement.style = "";
	window.setTimeout(function(){ box.parentElement.style = "display:none"; }, 500);
}

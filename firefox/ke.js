if (window == top) {
	window.addEventListener('keydown', doKeyPressinc, false);
	window.addEventListener('keydown', doKeyPressdec, false);
}

var c = 0

function doKeyPressinc(e){
	// Handle setting faster playback rate only when playback reaches 2x.
	
	if (e.key != '>') { return; }
	
	console.log('Pressed '+ e.key + 'inside inc');
	
	if (e.key = '>') {
	var video = document.getElementsByClassName("video-stream html5-main-video")[0];
	if (video.playbackRate < 2.) {
		c = 0;
		return; }
	if (video.playbackRate >= 2.) {
		if (c == 0) { 
			c = 1;
			return; }
		var pr = video.playbackRate += .25;
	 }
	}
	
	console.log('Pressed '+ e.key +' PR: '+pr);

	var box = document.getElementsByClassName("ytp-bezel-text-wrapper")[0];
	box.children[0].innerText = pr + 'x';
	box.parentElement.style = "";
	window.setTimeout(function(){ box.parentElement.style = "display:none"; }, 500);
}

function doKeyPressdec(e){

	if (e.key != '<') { return; }
	c = 0;
}
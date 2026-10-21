// Wrapped so nothing leaks into YouTube's globals when running in the page's MAIN world.
(function(){

if (window == top) {
	window.addEventListener('keydown', doKeyPressinc, false);
	window.addEventListener('keydown', doKeyPressdec, false);
	window.addEventListener('keydown', doShortsKeyPress, true);
}

// Set once YouTube's own > handler has reached 2x, so that press isn't counted twice.
var c = 0;

function isShorts(){
	return location.pathname.startsWith('/shorts/');
}

// Page-side player object: holds the player API (e.g. toggleSubtitles).
// Firefox content scripts see it through wrappedJSObject, Chrome runs this script in the MAIN world.
function getPlayer(id){
	var player = document.getElementById(id);
	return player && (player.wrappedJSObject || player);
}

function showRate(player, pr){
	var box = player.getElementsByClassName("ytp-bezel-text-wrapper")[0];
	if (!box) { return; }
	box.children[0].innerText = pr + 'x';
	box.parentElement.style = "";
	window.setTimeout(function(){ box.parentElement.style = "display:none"; }, 500);
}

function doKeyPressinc(e){
	// Handle setting faster playback rate only when playback reaches 2x.
	// If playback rate is >=2x, pressing < goes straight to 1.75x. That's YouTube.

	if (e.key != '>' || isShorts()) { return; }
	var player = document.getElementById("movie_player");
	var video = player && player.getElementsByClassName("video-stream html5-main-video")[0];
	if (!video) { return; }
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

	showRate(player, pr);
}

function doKeyPressdec(e){
	if (e.key != '<') { return; }
	c = 0;
}

function isTyping(e){
	var t = e.target;
	return t.isContentEditable || t.tagName == 'INPUT' || t.tagName == 'TEXTAREA';
}

function toggleSubtitles(player){
	if (typeof player.toggleSubtitles == 'function') {
		player.toggleSubtitles();
		return;
	}
	var track = player.getOption('captions', 'track');
	if (track && track.languageCode) {
		player.setOption('captions', 'track', {});
	} else {
		var tracks = player.getOption('captions', 'tracklist') || [];
		if (tracks.length) { player.setOption('captions', 'track', tracks[0]); }
	}
}

function doShortsKeyPress(e){
	// YouTube Shorts ignore < > and c, so handle them all here.

	if (!isShorts() || e.ctrlKey || e.altKey || e.metaKey || isTyping(e)) { return; }
	if (e.key != '>' && e.key != '<' && e.key != 'c') { return; }
	var el = document.getElementById("shorts-player");
	var video = el && el.getElementsByTagName("video")[0];
	if (!video) { return; }

	if (e.key == 'c') {
		toggleSubtitles(getPlayer("shorts-player"));
		return;
	}

	var pr = video.playbackRate + (e.key == '>' ? .25 : -.25);
	if (pr < .25) { pr = .25; }
	video.playbackRate = pr;

	showRate(el, pr);
}

})();

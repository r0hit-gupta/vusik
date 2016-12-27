const gapikey = 'AIzaSyCKMpw2nmPnon_gkh4EIXnbiAmrZNw-v4M';

function startListening(){

// new instance of speech recognition
var recognition = new webkitSpeechRecognition();
// set params
recognition.continuous = false;
recognition.interimResults = true;
recognition.start();

recognition.onresult = function(event){
  // delve into words detected results & get the latest
  // total results detected
  var resultsLength = event.results.length -1 ;
  // get length of latest results
  var ArrayLength = event.results[resultsLength].length -1;
  // get last word detected
  var saidWord = event.results[resultsLength][ArrayLength].transcript.substr(4);
    console.log(saidWord);

  if(event.results[0].isFinal){
  	playMusic(saidWord);
    
  console.log(saidWord);
  var msg = new SpeechSynthesisUtterance("playing, " + saidWord);
window.speechSynthesis.speak(msg);
}
}

// speech error handling
recognition.onerror = function(event){
  console.log('error?');
  console.log(event);
}

var msg = new SpeechSynthesisUtterance('okay');
window.speechSynthesis.speak(msg);


function playMusic(song){
	$.get(
    	"https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: song + 'song',
            type: 'video',
            key: gapikey
        }, function(data) {
       var id = data.items[0].id.videoId;
var url = 'https://www.youtube.com/embed/'+id+'?enablejsapi=1&autoplay=1';
       
     console.log(data.items[0].id.videoId);
     $('iframe').attr('src', url);
        }
)}

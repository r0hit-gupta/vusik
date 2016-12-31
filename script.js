const gapikey = 'AIzaSyCKMpw2nmPnon_gkh4EIXnbiAmrZNw-v4M';
var listening = false;

const initTitle = "Try 'Play tum hi ho'";
// new instance of speech recognition
var recognition = new webkitSpeechRecognition();

// set params
recognition.continuous = false;
recognition.interimResults = true;

function startListening(){
    recognition.start();

    recognition.onresult = function(event){
        var saidWord = event.results[0][0].transcript.substr(4);
        console.log(saidWord);
        $('.text').text(saidWord);
        if(event.results[0].isFinal){
            $('.ring1, .ring2').removeClass('mic-active');
            $('.text').addClass('white');
        listening = 0;

             playMusic(saidWord); 
            console.log(saidWord);
            var msg = new SpeechSynthesisUtterance("playing, " + saidWord);
            window.speechSynthesis.speak(msg);
            noteFall();
      }
    }

    // speech error handling
    recognition.onerror = function(event){
      console.log('Error occured');
      console.log(event);
    }
}

function playMusic(song){
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: song + ' song',
            type: 'video',
            key: gapikey
        }, function(data) {
            var id = data.items[0].id.videoId;
            var url = 'https://www.youtube.com/embed/'+id+'?enablejsapi=1&autoplay=1';
       
             console.log(data.items[0].id.videoId);
             $('iframe').attr('src', url);
        }
)}

$('.mic').on('click', function(){
    if(listening){
        listening = 0;
        recognition.abort();
          $('.ring1, .ring2').removeClass('mic-active');        
    }
    else {
        listening = 1;
        $('.text').removeClass('white').text(initTitle);

          $('iframe').attr('src', '');
  $('.ring1, .ring2').toggleClass('mic-active');
        $('.notefall').fadeOut();

    var msg = new SpeechSynthesisUtterance("yo");
    window.speechSynthesis.speak(msg);
    startListening();
    }

});

//animated notes 
function noteFall(){
    var notes = document.querySelectorAll('.note');
    for (var i = 0, len = notes.length; i < len; ++i) {
        var note = notes[i];
            var scale = Math.random() * .8 + .2;
        var player = note.animate([
          { transform: 'translate3d(' + (i/len*100) + 'vw,0,0) scale(' + scale + ')', opacity: scale*0.6 },
          { transform: 'translate3d(' + (i/len*100 + 10) + 'vw,50vh,0) scale(' + scale + ')', opacity: 0 }
        ], {
          duration: Math.random() * 3000 + 2000,
          iterations: Infinity,
          delay: -(Math.random() * 5000)
        });
    }
    $('.notefall').fadeIn(); 
}

$(document).on('change', 'iframe', function(){
    if(this.attr('src')) noteFall();
    else {
        $('.notefall').fadeOut();
    }
});





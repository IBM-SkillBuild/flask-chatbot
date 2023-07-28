let msg=""
let respuesta="Hola soy Eduardo.  Si no sabes que preguntarme, escribe ayuda"
var $messages = $('.messages-content'),
    d, h, m,
    i = 0;

$(window).load(function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 100);
});

function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
  $('.message-input').focus();
}

function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}

function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 500 + (Math.random() * 20) * 100);
  $('.message-input').focus();
}

$('.message-submit').click(function() {
  insertMessage();
});

$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})


function fakeMessage() {
  if ($('.message-input').val() != '') {
    return false;
  }
  if( msg !=""){
    server.preguntar(msg)
    
  }
  
  $('<div class="message loading new"><figure class="avatar"><img src="../static/images/foto-chatbot-edu.png" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    if (respuesta==""){
      respuesta="error timeout de servidor"
    }
    $('<div class="message new"><figure class="avatar"><img src="../static/images/foto-chatbot-edu.png" /></figure>' + respuesta + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    respuesta=""
    i++;
  }, 2000 + (Math.random() * 20) * 100);

}

function larespuesta(mirespuesta){
  respuesta=mirespuesta
}


function resolver(asunto) {
  $('.message-input').val(asunto)
  msg=asunto
  insertMessage();
}
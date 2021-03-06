// Twitchtv API requests : JSON , ajax

$(function() {

  var channels = ['savjz', 'faker', 'rdulive', 'ESL_SC2', 'OgamingSC2'];

  function twitch_ajax(nick) {
    $.ajax({
      type: 'GET',
      url: 'https://api.twitch.tv/kraken/streams/' + nick,
      headers: {
        'Client-ID': '44fjq05z7s9a6o1o2njair9dm8nueq'

      },
      success: function(data) {
        if (data.stream != null) {
          $.ajax({
            type: 'GET',
            url: 'https://api.twitch.tv/kraken/channels/' + nick,
            headers: {
              'Client-ID': '44fjq05z7s9a6o1o2njair9dm8nueq'

            },
            success: function(data) {
              $('.all-list').prepend('<li class="list-group-item online p-4 p-md-4"><img src="' + data.logo + '" class="rounded-circle" alt=""><a href="#">' + data.display_name + '</a><span>' + data.status + '</span></li>');
              $('.online-list').append('<li class="list-group-item online p-4 p-md-4"><img src="' + data.logo + '" class="rounded-circle" alt=""><a href="#">' + data.display_name + '</a><span>' + data.status + '</span></li>');
            }
          });
        } else if (data.stream == null) {
          $.ajax({
            type: 'GET',
            url: 'https://api.twitch.tv/kraken/channels/' + nick,
            headers: {
              'Client-ID': '44fjq05z7s9a6o1o2njair9dm8nueq'

            },
            success: function(data) {
              $('.all-list').append('<li class="list-group-item disabled offline p-4 p-md-4"><img src="' + data.logo + '" class="rounded-circle" alt=""><a href="#">' + data.display_name + '</a><span>Offline</span></li>');
              $('.offline-list').append('<li class="list-group-item disabled offline p-4 p-md-4"><img src="' + data.logo + '" class="rounded-circle" alt=""><a href="#">' + data.display_name + '</a><span>Offline</span></li>');
            }
          });
        }
      }
    });
  }

  for (var i = 0; i < channels.length; i++) {
    twitch_ajax(channels[i]);
  }

  // animations for width > 1200

if(screen.width>1200){

  $('.list-group-item').mouseenter(function() {
    if ($(this).hasClass('active') == false) {
      $(this).animate({
        'right': '120px'
      }, 500);
    }
  });

  $('.list-group-item').mouseleave(function() {
    if ($(this).hasClass('active') == false) {
      $(this).animate({
        'right': '0px'
      }, 500);
    }
  });

  $('.list-group-item').click(function() {
    $('.list-group .list-group-item').not(this).animate({
      'right': '0px'
    }, 500);
  });

}

});

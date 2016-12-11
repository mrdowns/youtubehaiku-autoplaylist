var haikus = document.querySelectorAll('div[data-subreddit=youtubehaiku]'),
    haiku_is_eligible = function (haiku_element) {
      var score_element = haiku_element.querySelector('div.score'),
          score = 0;
      if (score_element) {
        score = score_element.getAttribute('title');
      }
      if (score > 100) {
        return true;
      }
    },
    get_youtube_code = function (haiku_element) {
      var url = haiku_element.getAttribute('data-url'),
          code = '',
          code_match = [];

      if (url.indexOf('youtu.be') > -1) {
          code_match = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
      }

      if (url.indexOf('youtube.com/watch?v=') > -1) {
        code_match = url.match(/watch\?v\=([a-zA-Z0-9_-]+)/);
      }

      if (code_match.length > 1) {
        return code_match[1];
      }
      return null;
    },
    get_playlist = function () {
      var eligible_haikus = [];
      for(var i = 0; i < haikus.length; i++){
        if (haiku_is_eligible(haikus[i])) {
          var code = get_youtube_code(haikus[i]);
          if (code) {
            eligible_haikus.push(code);
          }
        }
      }
      return 'https://www.youtube.com/watch_videos?video_ids=' + eligible_haikus.join(',');
    };

// console.log('youtube url', get_playlist());
// chrome.windows.create({"url":get_playlist(), "incognito":true});
chrome.runtime.sendMessage({url:get_playlist()});

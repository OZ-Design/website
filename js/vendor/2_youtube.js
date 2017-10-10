var YoutubeDelayed = {
  initPlayer: function(node) {
    //initialise the player in specified node
    var videoId = node.getAttribute("data-videoid");
    var image = node.getAttribute("data-image") || "maxresdefault.jpg";

    node.style.backgroundImage = node.getAttribute("data-image")
      ? "url(" + image + ")"
      : "url(http://img.youtube.com/vi/" + videoId + "/" + image + ")";
    node.innerHTML =
      '<a class="play-button" href="http://www.youtube.com/watch?v=' +
      videoId +
      '" target="_blank"><span class="play-button_icon"><svg viewBox="0 0 15 18" xmlns="http://www.w3.org/2000/svg"><polygon points="0 0 0 18 15 9 0 0"></polygon></svg></span></a>' +
      '<div class="video-embed_overlay"></div>';
    node.firstChild.onclick = YoutubeDelayed.loadPlayer;
  },
  init: function() {
    //initialise the players
    var players = document.getElementsByClassName("video-embed");
    var i;
    for (i = 0; i < players.length; i++) {
      YoutubeDelayed.initPlayer(players[i]);
    }
  },
  loadPlayer: function(e) {
    e.preventDefault();
    //load player when user clicked play button
    this.parentNode.innerHTML =
      '<iframe src="http://www.youtube.com/embed/' +
      this.parentNode.getAttribute("data-videoid") +
      '?autoplay=1&controls=0&amp;fs=0&amp;modestbranding=1&amp;rel=0&amp;showinfo=0" frameborder="0" allowfullscreen></iframe>';
  }
};

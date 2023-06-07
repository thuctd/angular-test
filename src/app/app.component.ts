import { Component, OnInit } from '@angular/core';
import YouTubePlayer from 'youtube-player';

let player;

player = YouTubePlayer('video-player');

// 'loadVideoById' is queued until the player is ready to receive API calls.
player.loadVideoById('M7lc1UVf-VE');

// 'playVideo' is queue until the player is ready to received API calls and after 'loadVideoById' has been called.
player.playVideo();

// 'stopVideo' is queued after 'playVideo'.
player.stopVideo().then(() => {
  // Every function returns a promise that is resolved after the target function has been executed.
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  tag: any;
  player;
  done;

  ngOnInit() {
    this.tag.id = 'iframe-demo';
    this.tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(this.tag, firstScriptTag);
  }

  onYouTubeIframeAPIReady() {
    this.player = new YouTubePlayer.Player('existing-iframe-example', {
      events: {
        onReady: this.onPlayerReady,
        onStateChange: this.onPlayerStateChange,
      },
    });
  }

  onPlayerReady(event) {
    event.target.playVideo();
  }

  onPlayerStateChange(event) {
    if (event.data == YouTubePlayer.PlayerState.PLAYING && !this.done) {
      setTimeout(this.stopVideo, 6000);
      this.done = true;
    }
  }

  stopVideo() {
    this.player.stopVideo();
  }
}

/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/

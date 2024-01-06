import { Component, OnInit } from '@angular/core';

declare global {
  interface Window {
    YT: any;
  }
}
@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  constructor() {}

  tag = document.createElement('script');

  player = null;
  done = false;
  id = '99TJpnnHfxk';

  ngOnInit() {
    this.tag.src = 'https://www.youtube.com/iframe_api';
  }

  onYouTubeIframeAPIReady() {
    this.player = new window.YT.Player('player', {
      height: '390',
      width: '640',
      videoId: 'M7lc1UVf-VE',
      playerVars: {
        playsinline: 1,
      },
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
    if (event.data == window.YT.PlayerState.PLAYING && !this.done) {
      setTimeout(this.stopVideo, 6000);
      this.done = true;
    }
  }

  stopVideo() {
    this.player.stopVideo();
  }
}

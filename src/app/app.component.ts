import { Component, OnInit } from '@angular/core';
var tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

declare global {
  interface Window {
    recaptchaVerifier: any; // 👈️ turn off type checking
    dmtSetup: any;
    phoneNumber: string;
    fullName: string;
    step: number;
    numChange: number;
    WebGLTrans: number;
    [key: string]: any;
    YT: any;
  }
}

const callback = window.onYouTubeIframeAPIReady;
callback && callback();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  tag: any;
  player;
  done: boolean;
  youTubePlayer;

  ngOnInit() {
    this.onYouTubeIframeAPIReady();
  }

  onYouTubeIframeAPIReady() {
    this.player = new window.YT.Player('player', {
      width: 250,
      height: 150,
      videoId: 'M7lc1UVf-VE',
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

  playVideo(){
    this.player.playVideo()
  }

  


}

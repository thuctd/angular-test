import { AfterViewInit, Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

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
  // tag: any;
  player;
  done: boolean = false;
  youTubePlayer;
  videoId: string = 'https://www.youtube.com/watch?v=vwjThI3mMHM';

  convertToPDF() {
    const element = document.getElementById('test');

    if (element) {
      html2canvas(element).then((canvas) => {
        console.log(canvas);
        const contentDataURL = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'px',
          format: [+canvas.height, +canvas.width],
        });
        pdf.addImage(
          contentDataURL,
          'PNG',
          0,
          0,
          pdf.internal.pageSize.getWidth(),
          pdf.internal.pageSize.getHeight()
        );
        pdf.save('your_file.pdf');
      });
    }
  }

  ngOnInit() {
    var tag = document.createElement('script');
    tag.id = 'iframe-demo';
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  onYouTubeIframeAPIReady() {
    if (!this.player) {
      this.player = new window.YT.Player('player', {
        videoId: this.videoId.split('v=')[1],
        events: {
          onReady: this.onPlayerReady,
          onStateChange: this.onPlayerStateChange,
        },
      });
      this.done = true;
    }
  }

  detroy() {
    console.log(this.player);
    if (!this.player) return;
    this.player.destroy();
    this.onYouTubeIframeAPIReady();
  }

  onPlayerReady(event) {
    console.log(this.player);

    event.target.playVideo();
  }

  onPlayerStateChange(event) {
    if (event.data == window.YT.PlayerState.PLAYING && !this.done) {
      setTimeout(this.stopVideo, 6000);
      this.done = true;
    }
  }

  stopVideo() {
    console.log(this.player);

    this.player.stopVideo();
  }

  playVideo() {
    this.onYouTubeIframeAPIReady();
    console.log(this.player);
    this.player.playVideo();
  }

  pauseVideo() {
    console.log(this.player);

    this.player.pauseVideo();
  }
}

import { AfterViewInit, Component, OnInit } from '@angular/core';

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
  ngOnInit() {}
}

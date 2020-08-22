import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CameraService {

video:any;

  constructor() { }

  public Test() {
      console.log(0);    
  }

  public InitCamera(config:any, video: any)
  {
    var browser = <any>navigator;
    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    browser.mediaDevices.getUserMedia(config).then((stream: any) => {
      video.srcObject = stream;
      video.play();
    });
  }

}
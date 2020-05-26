import { Component, ElementRef, Input } from '@angular/core';
import { ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'camera-detection',
  templateUrl: './camera-detection.component.html',
  styleUrls: ['./camera-detection.component.css']
})
export class CameraDetectionComponent implements AfterViewInit {
  @ViewChild('videoElement') videoElement: any;
  @ViewChild('myCanvas') canvas : ElementRef<HTMLCanvasElement>
  @Input() isPlaying: boolean;

  video: any;
  public context  : CanvasRenderingContext2D;
  vendorUrl = window.URL || window.webkitURL;

  displayControls = true;
  videoWidth = 640;
  videoHight = 480;

  ngAfterViewInit(): void {
    if(this.isPlaying)
      this.start();
  }

  setVideoHight(event : any) {
    this.videoHight = event.target.value;
  }

  setVideoWidth(event : any) {
    this.videoWidth = event.target.value;
  }

  
  draw(canvas : ElementRef<HTMLCanvasElement>, video : any, appContext :any) {
    var $this = this; //cache
    var ctx = canvas.nativeElement.getContext("2d");

    (function loop() {
      if(ctx!== null && ctx!== undefined)
        {       
          ctx.drawImage(video, 0, 0, 640, 480);
          appContext.getImageData(ctx);
        }
        setTimeout(loop, 1000 / 10); // drawing at 30fps    
    })();
  }

  start() {
    // this.initCamera({ video: true, audio: false });
    this.initCamera({ video: true, audio: false });
    var ctx = this.context;
    var appContext = this;
    this.video.addEventListener('play', this.draw(this.canvas, this.video, appContext), false);
  }

  pause() {
    this.video.pause();
  }

  toggleControls() {
    this.video.controls = this.displayControls;
    this.displayControls = !this.displayControls;
  }

  resume() {
    this.video.play();
  }

  sound() {
    this.initCamera({ video: true, audio: true });
  }

  initCamera(config:any) {
    var browser = <any>navigator;
    this.video = this.videoElement.nativeElement;
    browser.getUserMedia = (browser.getUserMedia ||
      browser.webkitGetUserMedia ||
      browser.mozGetUserMedia ||
      browser.msGetUserMedia);

    browser.mediaDevices.getUserMedia(config).then(stream => {
      this.video.srcObject = stream;
      this.video.play();
    });
  }

  getImageData(canvasContext : CanvasRenderingContext2D){

    for(let i = 0; i< this.videoWidth; i+=5)
    {
      for(let j = 0; j< this.videoHight; j+=5)
      {
        var pixelData = canvasContext.getImageData(i,j,5,5).data;
        if(this.checkPixel(pixelData))
        {
          canvasContext.fillRect(i, j, 20, 20);
          return;
        }
      }
    }
  }

  checkPixel(pixel : Uint8ClampedArray) : boolean {
    for(let i = 0; i< pixel.length - 10; i+=4)
    {
      if(pixel[i] >= 165 && pixel[i] <  255 )
        if(pixel[i+1] >= 30 && pixel[i+1] < 80)
          if(pixel[i+2] >= 30 && pixel[i+2] < 80)
           return true;        
    }
    return false;
  }
}
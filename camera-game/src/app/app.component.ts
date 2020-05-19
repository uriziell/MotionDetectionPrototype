import { Component, ElementRef } from '@angular/core';
import { ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('videoElement') videoElement: any;
  @ViewChild('myCanvas') canvas : ElementRef<HTMLCanvasElement>
  video: any;
  public context  : CanvasRenderingContext2D;
  vendorUrl = window.URL || window.webkitURL;

  isPlaying = false;

  displayControls = true;
  videoWidth = 640;
  videoHight = 480;

  // ngOnInit(): void {
  //   this.videoWidth = 640;
  //   this.videoHight = 480;
  // }
  
  ngAfterViewInit(): void {
    this.initCamera({ video: true, audio: true });
    var ctx = this.context;
    var appContext = this;
    this.video.addEventListener('play', this.draw(this.canvas, this.video, appContext), false);
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
    // if(appContext.videoWidth == 0 || appContext.videoHight == 0)
    // {
    //   appContext.videoWidth = 640;
    //   appContext.videoHight = 480;

    // }
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
    this.initCamera({ video: true, audio: false });
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

    for(let i = 0; i< this.videoWidth; i++)
    {
      for(let j = 0; j< this.videoHight; j++)
      {
        var pixelData = canvasContext.getImageData(i,j,1,1).data;
        if(pixelData[0] >= 165 && pixelData[0] <  255
          && pixelData[1] >= 30 && pixelData[1] < 80
          && pixelData[2] >= 30 && pixelData[2] < 80)
          {
            console.log("i: " + i + "j: " + j);

            canvasContext.fillRect(i, j, 20, 20);

            return;
          }
      }
    }

  }
}
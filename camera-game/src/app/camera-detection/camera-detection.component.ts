import { Component, ElementRef, Input } from '@angular/core';
import { ViewChild, AfterViewInit } from '@angular/core';
import { CameraService } from '../services/camera.service';
import { CanvasService } from '../services/canvas.service';

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

  constructor(private _cameraService: CameraService, private _canvasService: CanvasService) {

  }

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
    var ctx = canvas.nativeElement.getContext("2d");

    (function loop() {
      if(ctx!== null && ctx!== undefined)
        {       
          ctx.drawImage(video, 0, 0, 640, 480);
          appContext._canvasService.getImageData(ctx, 480, 640);
        }
        setTimeout(loop, 1000 / 10); // drawing at 30fps    
    })();
  }

  start() {
    // this.initCamera({ video: true, audio: false });
    this._cameraService.Test();
    this.initCamera({ video: true, audio: false });
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
    this.video = this.videoElement.nativeElement;
    this._cameraService.InitCamera(config,this.video);
  } 
}
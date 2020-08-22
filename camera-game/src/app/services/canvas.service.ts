import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
   
   public draw(canvas : ElementRef<HTMLCanvasElement>, video : any, appContext :any) {
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

    public getImageData(canvasContext : CanvasRenderingContext2D, videoHight : number, videoWidth : number){
  
      for(let i = 0; i< videoWidth; i+=5)
      {
        for(let j = 0; j< videoHight; j+=5)
        {
          var pixelData = canvasContext.getImageData(i,j,5,5).data;
          if(this.checkPixel(pixelData))
          {
            canvasContext.fillRect(i, j, 100, 50);
            return;
          }
        }
      }
    }   

    private checkPixel(pixel : Uint8ClampedArray) : boolean {
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
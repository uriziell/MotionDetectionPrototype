import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CanvasService {
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
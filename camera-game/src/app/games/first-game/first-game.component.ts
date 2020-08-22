import { Component, Input } from '@angular/core';

@Component({
    selector: 'camera-detection',
    templateUrl: './first-game.component.html',
    styleUrls: ['./first-game.component.css']
  })

  export class FirstGameComponent {
    @Input() isPlaying: boolean;
  }
import { Component, Input } from '@angular/core';

@Component({
    selector: 'camera-detection',
    templateUrl: './second-game.component.html',
    styleUrls: ['./second-game.component.css']
  })

  export class SecondGameComponent {
    @Input() isPlaying: boolean;
  }
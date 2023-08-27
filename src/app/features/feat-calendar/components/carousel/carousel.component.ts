import { Component } from '@angular/core';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent {

  images: string[] = [
    'assets/images/Adobe_Corporate.png',
    'assets/images/amazon-logo.svg',
    'assets/images/Burger_King.png',
    'assets/images/c--4.svg',
    'assets/images/ChatGPT_350x350.png',
    'assets/images/ChatGPT_logo.png',
    'assets/images/icon-svg-hd.png',
    'assets/images/man-logo.svg',
    'assets/images/random-logo-svg-vector.svg',
    'assets/images/random-shape-outline.svg',
    'assets/images/starbucks.svg'
  ];

}

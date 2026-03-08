import { Component, signal } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-main-slider',
  imports: [CarouselModule ],
  templateUrl: './main-slider.component.html',
  styleUrl: './main-slider.component.css',
})
export class MainSliderComponent {
    mainOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true ,
    autoplayTimeout:2500,
    autoplayHoverPause:true,
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
    0: { items: 1 },
    1000: { items: 1 }
    },
    nav: false ,
    autoHeight: false,
  }
}

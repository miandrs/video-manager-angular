import { AfterViewInit, Component, HostListener, Input, OnInit } from '@angular/core';
import { SlidesOutputData, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carousel-holder',
  standalone: false,
  
  templateUrl: './carousel-holder.component.html',
  styleUrl: './carousel-holder.component.scss',
})
export class CarouselHolderComponent implements OnInit, AfterViewInit {
  @Input() slideStore!: any[];
  @Input() isHomePage: boolean = false;
  staticImg = 'img/bg.jpg';
  responsive: Record<number, { items: number }> = {
    0: {
      items: 1
    },
    940: {
      items: 2
    },
  }; 
  activeSlides!: SlidesOutputData;
  customOptions!: OwlOptions; 

  getData(data: SlidesOutputData) {
    this.activeSlides = data;
  }

  changeOptions() {
    this.customOptions = { ...this.customOptions, loop: false }
  }
  ngOnInit() {
    if(this.slideStore.length > 2) {
      let res = 2000/this.slideStore.length;
      let initRes = 0;
      for(let i = 1; i < this.slideStore.length-1; i++) {
        this.responsive[Math.floor(initRes)] = { items: i };
        initRes += res; 
      }
    }
    this.initializeOwlCarousel();
  }

  ngAfterViewInit(): void {
      this.initializeOwlCarousel();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    setTimeout(() => {
      this.refreshOwlCarousel();
    }, 500);
  }

  initializeOwlCarousel() {
    this.customOptions = {
      loop: false,
      rewind: true,
      mouseDrag: false,
      touchDrag: false,
      pullDrag: false,
      dots: false,
      navSpeed: 700,
      navText: [ '<i class="carousel-control-prev-icon"></i>', '<i class="carousel-control-next-icon"></i>' ],
      center: false,
      autoplay: true,
      responsive: this.responsive,
      nav: true
    }
  }

  refreshOwlCarousel() {
   this.initializeOwlCarousel(); 
  }
}

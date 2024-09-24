import { Component, OnInit } from '@angular/core';
import { TeaserBannerComponent } from './teaser-banner/teaser-banner.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-teaser',
  standalone: true,
  imports: [
    TeaserBannerComponent,
    VideoPlayerComponent,
  ],
  templateUrl: './teaser.component.html',
  styleUrl: './teaser.component.scss'
})
export class TeaserComponent implements OnInit{
  category:string = 'women'; 

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.category = params['category'] || 'women'; // Default to 'women' if no category
      this.loadTeaserContent();
    });
  }

  loadTeaserContent(): void {
    // Logic to load teaser content based on the category
    console.log(`Loading teaser content for category: ${this.category}`);
    // You can fetch teaser data from a service based on this.category
  }

}

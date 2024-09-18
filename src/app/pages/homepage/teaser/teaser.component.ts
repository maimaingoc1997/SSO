import { Component } from '@angular/core';
import { TeaserBannerComponent } from './teaser-banner/teaser-banner.component';
import { VideoPlayerComponent } from './video-player/video-player.component';
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
export class TeaserComponent {

}

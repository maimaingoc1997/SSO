import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-video-player',
  standalone: true,
  imports: [
    MatIconModule,
    MatIconButton,
  ],
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit {

  category: string = 'women'; 
  videoSource: string = '';
  isVideo = true;

  @ViewChild('customVideo') videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('customImage') imageElement!: ElementRef<HTMLImageElement>; // Add this for image handling

  isPlaying = false;
  isMuted = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.category = params.get('category') || 'women'; 
      this.loadVideo(); 
      window.scrollTo(0, 0);
    });
  }

  loadVideo(): void {
    switch (this.category.toLowerCase()) {
      case 'men':
        this.videoSource = '1000_FALL_M_15_16-9.mp4';
        this.isVideo = true;
        break;
      case 'kids':
        this.videoSource = '4160A-16x9-sound-kids-start-page-prio-week.mp4';
        this.isVideo = true;
        break;
      case 'home':
        this.videoSource = 'https://image.hm.com/content/dam/global_campaigns/season_09/home/start-page-assets/w-35/7010B-w35-stage-16x9-NS-1.jpg?imwidth=1536';
        this.isVideo = false;
        console.log('Loading image for home');
        break;
      case 'beauty':
        this.videoSource = 'https://image.hm.com/content/dam/global_campaigns/season_00/beauty/start-page-assets/w-38/7210A-startpage-16x9.jpg?imwidth=1536';
        this.isVideo = false;
        break;
      default:
        this.videoSource = '1000-16x9-women-startpage-wk37.mp4';
        this.isVideo = true;
    }
    this.updateVideoSource(); 
  }
  

  updateVideoSource() {
    if (this.isVideo) {
      const video = this.videoPlayer.nativeElement;
      video.src = this.videoSource; 
      video.load(); 
      video.style.display = 'block'; 
      this.imageElement.nativeElement.style.display = 'none';
    } else {
      const image = this.imageElement.nativeElement;
      image.src = this.videoSource; 
      image.style.display = 'block'; 
      this.videoPlayer.nativeElement.style.display = 'none'; 
    }
  }
  

  togglePlayPause(): void {
    const video = this.videoPlayer.nativeElement;
    if (video.paused) {
      video.play();
      this.isPlaying = true;
    } else {
      video.pause();
      this.isPlaying = false;
    }
  }

  toggleMute(): void {
    const video = this.videoPlayer.nativeElement;
    video.muted = !video.muted;
    this.isMuted = video.muted;
  }
}

import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { VideoPlayerComponent } from "./pages/homepage/teaser/video-player/video-player.component";
import { HeaderComponent } from './shared/components/header/header.component';
import { ProductListComponent } from "./pages/homepage/product-list/product-list.component";
import { TeaserComponent } from "./pages/homepage/teaser/teaser.component";
import { FooterComponent } from './shared/components/footer/footer.component';
  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HeaderComponent,
    VideoPlayerComponent,
    MatGridListModule,
    ProductListComponent,
    TeaserComponent,
    FooterComponent
],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
  })
  export class AppComponent {
    title = 'hmwebsite';
  };


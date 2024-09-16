import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { VideoPlayerComponent } from "./features/teaser/video-player/video-player.component";
import { FooterComponent } from "./shared/components/footer/footer.component";
import { HeaderComponent } from './shared/components/header/header.component';
import { ProductListComponent } from "./features/product-list/product-list.component";
import { TeaserComponent } from "./features/teaser/teaser.component";
  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    HeaderComponent,
    FooterComponent,
    VideoPlayerComponent,
    MatGridListModule,
    ProductListComponent,
    TeaserComponent
],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
  })
  export class AppComponent {
    title = 'hmwebsite';
  };


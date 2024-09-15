import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./components/footer/footer.component";
import { HeaderComponent } from './components/header/header.component';
import { VideoPlayerComponent } from "./components/video-player/video-player.component";
  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet,
      MatToolbarModule,
      MatIconModule,
      MatButtonModule,
      HeaderComponent,
      FooterComponent,
      VideoPlayerComponent,
      MatGridListModule],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
  })
  export class AppComponent {
    title = 'hmwebsite';
  };


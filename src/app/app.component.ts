import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavigationEnd, Router, RouterLink, RouterOutlet } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ProductListComponent } from "./pages/homepage/product-list/product-list.component";
import { TeaserComponent } from "./pages/homepage/teaser/teaser.component";
import { VideoPlayerComponent } from "./pages/homepage/teaser/video-player/video-player.component";
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { filter } from 'rxjs';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';
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
    LoginComponent,
    RegisterComponent,
    FooterComponent,
    MatSidenavModule,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'hmwebsite';
  showHeaderFooter = true;

  constructor(private router: Router, private cd: ChangeDetectorRef) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Hide header/footer only when navigating to login or register routes
      this.showHeaderFooter = !(event.url === '/login' || event.url === '/register');
      console.log('Current URL:', event.url);
      console.log('showHeaderFooter:', this.showHeaderFooter);
      this.cd.markForCheck();
    });
  }
}



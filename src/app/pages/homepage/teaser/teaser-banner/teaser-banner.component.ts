import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-teaser-banner',
  standalone: true,
  imports: [],
  templateUrl: './teaser-banner.component.html',
  styleUrl: './teaser-banner.component.scss'
})
export class TeaserBannerComponent implements OnInit {
  category: string = 'women';
  pic_a: string = '';
  pic_b: string = '';
  pic_c: string = '';
  pic_d: string = '';
  constructor(private route: ActivatedRoute) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.category = params.get('category') || 'women';
      this.loadTeaser_banner();
    });
  }

  loadTeaser_banner(): void {
    switch (this.category.toLowerCase()) {
      case 'men':
        this.pic_a = "https://image.hm.com/content/dam/global_campaigns/season_00/men/start-page-assets/w-37/category-entrys/MP50CEA-Hoodies-sweatshirts-CE-week37-2x3.jpg?imwidth=1536";
        this.pic_b = "https://image.hm.com/content/dam/global_campaigns/season_00/men/start-page-assets/w-37/category-entrys/MP50CEC-Jeans-CE-week37-2x3.jpg?imwidth=1536";
        this.pic_c = "https://image.hm.com/content/dam/global_campaigns/season_00/men/start-page-assets/w-37/category-entrys/MP50CEB-Trousers-CE-week37-2x3.jpg?imwidth=1536";
        this.pic_d = "https://image.hm.com/content/dam/global_campaigns/season_00/men/start-page-assets/w-37/category-entrys/MP50CEE-Shirts-CE-week37-2x3.jpg?imwidth=1536";
        break;
      case 'kids':
        this.pic_a = "https://image.hm.com/content/dam/global_campaigns/season_00/kids/start-page-assets/w-37/4160B-4x5-NS-2-kids-start-page-prio-week-37.jpg?imwidth=1536";
        this.pic_b = "https://image.hm.com/content/dam/global_campaigns/season_00/kids/start-page-assets/w-37/4160C-4x5-NS-3-kids-start-page-prio-week-37.jpg?imwidth=1536";
        this.pic_c = "https://image.hm.com/content/dam/global_campaigns/season_00/kids/start-page-assets/w-37/Kids-2-8y-2x3-NS-C1kids-start-page-prio-week-37.jpg?imwidth=1536";
        this.pic_d = "https://image.hm.com/content/dam/global_campaigns/season_00/kids/start-page-assets/w-37/Kids-9-14Y2x3-NS-C2kids-start-page-prio-week-37.jpg?imwidth=1536";
        break;
      case 'home':
        this.pic_a = "https://image.hm.com/content/dam/global_campaigns/season_09/home/start-page-assets/w-38/7020A-W38-fullbleed-4x5-NS-2.jpg?imwidth=1536";
        this.pic_b = "https://image.hm.com/content/dam/global_campaigns/season_09/home/start-page-assets/w-38/7010C-W38-indent-4x5-NS-3.jpg?imwidth=1536";
        this.pic_c = "https://image.hm.com/content/dam/hm/wgb_content/gb_home_halloween%202x3.jpg?imwidth=1536";
        this.pic_d = "https://image.hm.com/content/dam/global_campaigns/season_09/home/start-page-assets/w-30/livingroom-CE-w30-42.jpg?imwidth=1536";
        break;
      case 'beauty':
        break;
      default:
        this.pic_a = "https://image.hm.com/content/dam/global_campaigns/season_00/ladies/startpage-assets/wk37/12-sep/new-in-4x5-women-startpage-wk37.jpg?imwidth=1536";
        this.pic_b = "https://image.hm.com/content/dam/global_campaigns/the_studio_all/studio-sep-2024/london-event-w37/2060-4x5-11-event-london-wk37.jpg?imwidth=1536";
        this.pic_c = "https://image.hm.com/content/dam/global_campaigns/season_00/ladies/startpage-assets/wk37/12-sep/2060-4x5-loli-women-startpage-wk37.jpg?imwidth=1536";
        this.pic_d = "https://image.hm.com/content/dam/global_campaigns/season_00/ladies/startpage-assets/wk37/12-sep/2060-4x5-lila-moss-women-startpage-wk37.jpg?imwidth=1536"
    }
  }
}

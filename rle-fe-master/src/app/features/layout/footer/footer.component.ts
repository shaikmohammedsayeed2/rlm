import { Component, Input, OnInit } from '@angular/core';
import { LandingPageService } from 'src/app/services/landingpage/landing-page.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  @Input() footerDetails: any;
  constructor() { }
  ngOnInit(): void {
    console.log(this.footerDetails,"footer")
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LandingPageService } from 'src/app/services/landingpage/landing-page.service';

declare var nav:any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  providers:[CookieService]
})
export class LayoutComponent  implements OnInit{
  headerDetails:any
  footerDetails:any
  public lab_id:any
  isLoaded:boolean = true

  constructor(private landingPageService:LandingPageService,
    private route: ActivatedRoute) { }
    ngOnInit(): void {
      localStorage.setItem('personRole', 'student' );
      new nav()
      this.lab_id = this.route.snapshot.paramMap.get('lab_id');
      this.getHeaderFooterDetails(this.lab_id)
    }
  getHeaderFooterDetails(lab_id:any){
    this.landingPageService.getLandingPageDetails(lab_id)?.subscribe((res:any)=>{
      this.headerDetails = {
        "logo":res?.logo,
        "lab_name":res?.name,
        "lab_id":lab_id
      }
      this.footerDetails = {
        "contact_us":res?.contact_us,
        "lab_name":res?.name
    }
    this.isLoaded = true
  },
  (error:any)=>{
    this.isLoaded= true;
  });
  }
  
}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component,} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import {  GalleryConfig, GalleryItem, ImageItem, LoadingStrategy, SlidingDirection } from 'ng-gallery';
import { ToastrService } from 'ngx-toastr';
import { LandingPageService } from 'src/app/services/landingpage/landing-page.service';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LandingPageComponent {
  config: GalleryConfig | undefined;
  images!: GalleryItem[];
  imagesList:any;
  landingPageDetails:any;
  isEventsEmpty:boolean = false
  eventsList:any
  public lab_id:any
  twitterHandle:any
  formdata!:FormGroup
  news:any
  constructor(private landingPageService:LandingPageService,
     private route: ActivatedRoute,
     private toastr: ToastrService,
     private cdr: ChangeDetectorRef ,
     private sanitizer: DomSanitizer) { }

ngOnInit() {
  this.formdata = new FormGroup({ 
    name: new FormControl(""),
    email: new FormControl(""),
    subject: new FormControl(""),
    message: new FormControl("")
 }); 
  this.lab_id = this.route.parent?.snapshot.paramMap.get('lab_id');
  this.images = [];
  this.config = {
   thumb:false,
   dots: true,
    loadingStrategy: LoadingStrategy.Preload,
    slidingDirection: SlidingDirection.Horizontal,
    thumbWidth:10,
    thumbHeight:10,
  };
  this.getLandingPageDetails(this.lab_id)
}

ngAfterViewInit(): void {
  (<any>window).twttr?.widgets.load();
}

getLandingPageDetails(lab_id:any){
  this.landingPageService.getLandingPageDetails(lab_id)?.subscribe((res:any)=>{
    this.news = res.news
    this.landingPageDetails = res
    this.imagesList = res?.slider
    this.images = []
    this.imagesList.forEach((value:any, index:any) => {
      this.images.push(new ImageItem({ src: value.image_url}));
  });
  if(res.events.length == 0){
    this.isEventsEmpty = true
  }
  this.eventsList = res.events
  this.twitterHandle = res.twitter_handle.replace(/^./, "");
  });
  this.cdr.detectChanges();
}

onFeedBackSubmit(data:any) {
  console.log(this.lab_id)
  var feedbackFormData = 
    {
      "lab_id": this.lab_id,
      "name": data.name ,
      "email":data.email,
      "subject": data.subject,
      "message": data.message 
    }
  
  this.landingPageService.sendFeedBack(feedbackFormData)?.subscribe((res:any)=>{
    this.toastr.success('Successfully sent the message, We will get back to you soon !!','Success', {
      timeOut: 3000,
    })
  },
  (error) => {
    console.log(error);
    this.toastr.error('Some Error Occured !!,Pls try again after some time', 'Major Error', {
      timeOut: 3000,
    });
  });
}
}

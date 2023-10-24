import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ImageItem } from 'ng-gallery';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { ToastrService } from 'ngx-toastr';
import { GalleryService } from 'src/app/services/gallery/gallery.service';
import { LandingPageService } from 'src/app/services/landingpage/landing-page.service';
import { PeopleService } from 'src/app/services/people/people.service';

@Component({
  selector: 'app-admin-lab',
  templateUrl: './admin-lab.component.html',
  styleUrls: ['./admin-lab.component.scss']
})
export class AdminLabComponent implements OnInit{
  public columns!: Columns[];
  allLabData:any
  allSelected = false;
  public configuration!: Config;
  lab_id:any
  @ViewChild('coverPageInput')
  coverPageInput!: ElementRef;
  @ViewChild('logoInput')
  logoInput!: ElementRef;
  @ViewChild('sliderInput')
  sliderInput!: ElementRef;

  selectedLogoFile!: File;

  labOverviewFormSubmitted = false;
  imagesList:any;
  isSlidersEmpty:boolean = false

  constructor(private peopleService:PeopleService,
              public route:ActivatedRoute,
              private landingPageService:LandingPageService,
              public toastr:ToastrService,
              private galleryService:GalleryService) {}
              isCoverImagePresent:boolean = true;
              labOverviewform!:FormGroup
              islabLogoPresent:boolean = true;
              labLogo:any = ''
              labCoverPage:any
            public selectedCoverPageFile !: File;
            public selectedSliderFile !: File;
  ngOnInit(): void {
    this.getAllLabs()
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.columns = [
      { key: 'name', title: 'Name' },
      { key: 'overview', title: 'Overview' }
    ];
    this.labOverviewform = new FormGroup({
      labName: new FormControl("",Validators.required),
      labOverview: new FormControl("",Validators.required),
      labTwitterHandle: new FormControl("",Validators.required),
      labPhone: new FormControl("",Validators.required),
      labEmail: new FormControl("",Validators.required),
      labAddress: new FormControl("",Validators.required),
    });
  }

  getAllLabs(){
    this.peopleService.getAllLabs()?.subscribe((data:any)=>{
      console.log(data)
      this.allLabData = data
    })
  }

  onlabOverviewSubmit(data:any){
    this.labOverviewFormSubmitted = true;
    if(this.labOverviewform.valid){
     let updateData = {
        "name": data.labName,
        "overview": data.labOverview,
        "address": data.labAddress,
        "email": data.labEmail,
        "phone": data.labPhone,
        "twitter_handle": data.labTwitterHandle,
        "lab_logo_url": this.labLogo,
        "lab_cover_url": this.labCoverPage
      }
      this.peopleService.addNewLab(updateData)?.subscribe((res:any)=>{
        console.log(res)
        this.toastr.success('','Lab Added successfully', {
          timeOut: 3000,
        })
        this.getAllLabs()
      })
    }
    else{
      this.toastr.error('','Please fill all the fields', {
        timeOut: 3000,
      })
    }
  }
  onFileLogoSelected(event: any): void {
    this.selectedLogoFile = event.target.files[0]
  }
  
  onFileCoverPageSelected(event: any): void {
    this.selectedCoverPageFile = event.target.files[0]
  }

  uploadImage(file:any, type:any){
    if(file!=undefined){
    console.log(file);
    this.galleryService.uploadImage(file)?.subscribe(
        (res: any) => {
           console.log(res)
           if(type == 'logo'){
            this.labLogo = res.url
            this.toastr.success('','Slider image added successfully', {
              timeOut: 3000,
            })
            this.resetInput(this.logoInput);
            }
            if(type == 'coverPage'){
              this.labCoverPage = res.url
              this.toastr.success('','Cover Page added successfully', {
                timeOut: 3000,
              })
              this.resetInput(this.coverPageInput);
  
            }
              
            
        }
    );
  }
  else{
    this.toastr.error('','Please select image', {
      timeOut: 3000,
    })
  }
  }
  resetInput(input:any) {
    input.nativeElement.value = "";
  }
  onDeleteClickLab(row:any){
    alert('Are you sure you want to delete this lab?')
    this.peopleService.deleteLab(row.id)?.subscribe((res:any)=>{
      console.log(res)
      this.toastr.success('','Lab deleted successfully', {
        timeOut: 3000,
      })
      this.getAllLabs()
    })
  }

}
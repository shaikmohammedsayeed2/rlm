import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GalleryService } from 'src/app/services/gallery/gallery.service';
import { PeopleService } from 'src/app/services/people/people.service';
import jwt_decode from "jwt-decode";
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-admin-profile',
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent {
  @ViewChild('profilePageInput')
  profilePageInput!: ElementRef;

  constructor(private peopleService:PeopleService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private galleryService:GalleryService,
    private cookieService:CookieService) { }
    isPersonImagePresent:boolean = true;
    profileform!:FormGroup
    profilepic:any
    isProfileFormSubmitted:boolean = false;
    public lab_id:any
    public selectedFile !: File;
    personId:any
    userRole:any
    personRole:any

  ngOnInit() {
    let user_info:any = jwt_decode(this.cookieService.get('rle_session'))
    this.personId = user_info.person_id
    this.userRole = user_info.role_name
    this.personRole = localStorage.getItem('personRole');
    this.profileform = new FormGroup({
      PersonName: new FormControl("",Validators.required),
      RollNo: new FormControl("",Validators.required),
      LinkedinUrl: new FormControl("",),
      GithubUrl: new FormControl("",),
      PersonalWebUrl: new FormControl("",),
    });
    this.getProfileData(this.personId)
  }

  onprofileSubmit(data:any){
    this.isProfileFormSubmitted = true;
    if(this.profileform.valid){
      console.log(data)
      let person_id = this.personId
      let formdata = {
        "lab_id":this.lab_id,
        "name":data.PersonName,
        "roll_number":data.RollNo,
        "linkedin_url":data.LinkedinUrl,
        "github_url":data.GithubUrl,
        "personal_web_url":data.PersonalWebUrl,
        "person_role":this.personRole,
        "user_role":this.userRole,
        "person_image":this.profilepic
      }
      this.peopleService.updatePerson(formdata,person_id)?.subscribe((res:any)=>{
        console.log(res)
        this.toastr.success('','Profile updated successfully', {
          timeOut: 3000,
        })
      })
    }
    else{
      this.toastr.error('Fill Name, Email','Please fill all the details', {
        timeOut: 3000,
      })
    }

  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0]
  }

  uploadImage(file:any){
    if(file!=undefined){
    console.log(file);
    this.galleryService.uploadImage(file)?.subscribe(
        (res: any) => {
          console.log(res)
            this.profilepic = res.url
            this.toastr.success('','Cover Page added successfully', {
              timeOut: 3000,
            })
            this.resetInput(this.profilePageInput);
        });
  }
  else{
    this.toastr.error('','Please select image', {
      timeOut: 3000,
    })
  }
  }

  getProfileData(person_id:any){
    this.peopleService.getProfile(person_id)?.subscribe((res:any)=>{
      console.log(res)
      this.profilepic = res.person_image
      res = res.person
      this.profileform.patchValue({
        PersonName: res.name,
        RollNo: res.roll_number,
        LinkedinUrl: res.linkedin_url,
        GithubUrl: res.github_url,
        PersonalWebUrl: res.personal_web_url,
      })
    })
  }
  resetInput(input:any) {
    input.nativeElement.value = "";
  }
}

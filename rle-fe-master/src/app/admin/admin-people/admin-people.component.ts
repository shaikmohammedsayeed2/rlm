import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingStrategy, SlidingDirection } from 'ng-gallery';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { ToastrService } from 'ngx-toastr';
import { GalleryService } from 'src/app/services/gallery/gallery.service';
import { PeopleService } from 'src/app/services/people/people.service';
import jwt_decode from "jwt-decode";
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-admin-people',
  templateUrl: './admin-people.component.html',
  styleUrls: ['./admin-people.component.scss']
})
export class AdminPeopleComponent {

  constructor(private peopleService:PeopleService,
    private galleryService:GalleryService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private cdr: ChangeDetectorRef,
    private cookieService:CookieService) { }
    isPersonImagePresent:boolean = true;
    peopleform!:FormGroup
    public lab_id:any
    public selectedFile !: File;
    facultyList:any
    studentsList:any
    sponsorsList:any
    isPeopleFormSubmitted:boolean = false
    profilePhoto:any = ''
    @ViewChild('profilePhotInput')
    profilePhotInput!: ElementRef;
    public configuration!: Config;
    public columns!: Columns[];
    selectedRow:any = null;
    allPeopleData:any
    personId:any
    user_info:any

  ngOnInit() {

     this.user_info = jwt_decode(this.cookieService.get('rle_session'))
    this.personId = this.user_info.person_id
    console.log(this.user_info,'user info')
    this.peopleform = new FormGroup({
      PersonName: new FormControl("",Validators.required),
      RollNo: new FormControl("",),
      LinkedinUrl: new FormControl("",),
      GithubUrl: new FormControl("",),
      PersonalWebUrl: new FormControl("",),
      PersonRole: new FormControl("",Validators.required),
      UserRole: new FormControl("",Validators.required),
    });
    this.lab_id = this.route.parent?.snapshot.paramMap.get('lab_id');
    this.getAllLabMemberDetails(this.lab_id)
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.columns = [
      { key: 'name', title: 'Name' },
      { key: 'roll_number', title: 'Roll Number/Designation' },
      { key: 'user_access', title: 'User Access' },
      {key:'user_role_name',title:'User Role Name'},
      {key:'Actions',title:'Actions'}
    ];
  }

  onpeopleSubmit(data:any){
    console.log(this.selectedRow)
    this.isPeopleFormSubmitted = true
    if(this.peopleform.valid){
      if(this.selectedRow!=null){
        let formdata = {
          "lab_id":this.lab_id,
          "name":data.PersonName,
          "roll_number":data.RollNo,
          "linkedin_url":data.LinkedinUrl,
          "github_url":data.GithubUrl,
          "personal_web_url":data.PersonalWebUrl,
          "person_role":data.PersonRole,
          "user_role":data.UserRole,
          "person_image":this.profilePhoto
        }
        let person_id = this.selectedRow.id
        this.peopleService.updatePerson(formdata,person_id)?.subscribe((res:any)=>{
          console.log('response',res)
          this.toastr.success('Person Updated Successfully','Success', {
            timeOut: 3000,
          })
          this.peopleform.reset()
          this.isPeopleFormSubmitted = false
          this.getAllLabMemberDetails(this.lab_id)
          this.selectedRow = null
          this.profilePhoto = ''
          
        })
        
      }
      else{
      let formdata = {
        "lab_id":this.lab_id,
        "name":data.PersonName,
        "roll_number":data.RollNo,
        "linkedin_url":data.LinkedinUrl,
        "github_url":data.GithubUrl,
        "personal_web_url":data.PersonalWebUrl,
        "person_role":data.PersonRole,
        "user_role":data.UserRole,
        "person_image":this.profilePhoto
      }
      this.peopleService.addPeople(formdata)?.subscribe((res:any)=>{
        console.log('response',res)
        this.toastr.success('Person Added Successfully','Success', {
          timeOut: 3000,
        })
        this.peopleform.reset()
        this.isPeopleFormSubmitted = false
        this.getAllLabMemberDetails(this.lab_id)
        this.selectedRow = null
        this.profilePhoto = ''
      })
    }
    }
    else{
      this.toastr.error('Please Fill Name,Person and User Role fields','Fill Fields', {
        timeOut: 3000,
      })
    }
  }

  getAllLabMemberDetails(lab_id:any){
    this.peopleService.getAllPeople(lab_id)?.subscribe((res:any)=>{
      this.allPeopleData = res
      console.log(res,'all peopel data')
    })
    }

    onFileSelected(event: any): void {
      this.selectedFile = event.target.files[0]
    }

    onChangePersonRole(e:any){
      this.peopleform.get('PersonRole')?.setValue(e.target.value, {
        onlySelf: true,
      })
    }
   onChangeUserRole(e:any){
      this.peopleform.get('UserRole')?.setValue(e.target.value, {
        onlySelf: true,
    })
  }
  clearForm(){
    this.peopleform.reset()
    this.isPeopleFormSubmitted = false
    this.profilePhoto = ''
    this.peopleform.patchValue({
      PersonRole: '',
      UserRole: '',
    });
    this.selectedRow = null
  }
  uploadImage(file:any, type:any){
    if(file!=undefined){
    console.log(file);
    this.galleryService.uploadImage(file)?.subscribe(
        (res: any) => {
           console.log(res)
           if(type == 'profilePhoto'){
            this.profilePhoto = res.url
            this.toastr.success('','Profile Image added successfully', {
              timeOut: 3000,
            })
            this.resetInput(this.profilePhotInput);
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
  onEditClick(e:any){
    console.log(e)
    this.selectedRow = e
    console.log(this.selectedRow,"selectedRow")
    this.peopleform.patchValue({
      PersonName: this.selectedRow.name,
      RollNo: this.selectedRow.roll_number,
      LinkedinUrl : this.selectedRow.linkedin_url,
      GithubUrl: this.selectedRow.github_url,
      PersonalWebUrl: this.selectedRow.personal_web_url,
      PersonRole: this.selectedRow.user_role_name,
      UserRole: this.selectedRow.user_access,
    });
    this.profilePhoto = this.selectedRow.profile_url  }
  onDeleteClick(e:any){
    let person_id = e.id
    this.peopleService.deleteLabMember(person_id)?.subscribe((res:any)=>{
      console.log('response',res)
      this.toastr.success('Person Deleted Successfully','Success', {
        timeOut: 3000,
      })
      this.getAllLabMemberDetails(this.lab_id)
    })  
  }
}

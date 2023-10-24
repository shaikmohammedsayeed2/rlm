// import { Component } from '@angular/core';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import jwt_decode from "jwt-decode";
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent {
  id:any
  isLoaded:boolean=false
  lab_id:any
  isAdmin:any = false
  user:any
  @Input() headerData: any;
constructor(public router:Router,
  public route:ActivatedRoute,
  private cookieService: CookieService)
{}
ngOnInit(){
  this.lab_id = this.route.snapshot.paramMap.get('lab_id');
this.id = 1
this.user = jwt_decode(this.cookieService.get('rle_session'))
if(this.user.role_name == 'admin'){
  this.isAdmin = true
}
const myArray = window.location.href.split("/");
    const lastel = (myArray[myArray.length-1])
    switch(lastel){
      case 'home':{
        this.id = 1;
        break;
      }
      case 'people':{
        this.id = 2;
        break;
      }
      case 'research/publications':{
        this.id = 3;
        break;
      }
      case 'research/conferences':{
        this.id = 4;
        break;
      }
      case 'gallery':{
        this.id = 5;
        break;
      }
      case 'login':{
        this.id = 6;
        break;
      }
    }
    this.isLoaded=true
}
setId(id:number){
  this.id = id
}

logout(){
  this.cookieService.delete('rle_session');
  let url = '/features/'+this.lab_id+'/home'
  this.router.navigate([url])
}

}

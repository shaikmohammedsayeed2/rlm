import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import jwt_decode from "jwt-decode";
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  id:any
  isLoaded:boolean=false
  @Input() headerData: any;
  user:any
  isLoggedin:any
  lab_id:any
constructor(public router:Router,
            public route : ActivatedRoute,
            private authService: SocialAuthService,
            private loginService:AuthService,
            private cookieService: CookieService)
{}
ngOnInit(){
  this.lab_id = this.route.snapshot.paramMap.get('lab_id');
  if(this.cookieService.check('rle_session')){
    this.isLoggedin = true
    this.user = jwt_decode(this.cookieService.get('rle_session'))
  }
  else{
    this.isLoggedin = false
  }
  this.authService.authState.subscribe((user) => {
  this.user = user;
  if(user!=null){
  let data = {
    "g_token":user.idToken,
    "lab_id":this.lab_id
  }
  this.loginService.authenticateUser(data)?.subscribe((res:any)=>{
    this.isLoggedin = true
  })
  console.log(this.user)
}
});
this.id = 1
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
      case 'research':{
        this.id = 3;
        break;
      }
      case 'gallery':{
        this.id = 4;
        break;
      }
      case 'login':{
        this.id = 5;
        break;
      }
      // case 'officebearers'||'officebearers2021'||'officebearers2020'||'officebearers2019':{
      //   this.id = 6;
      //   break;
      // }
      // case 'more':{
      //   this.id = 7;
      //   break;
      // }
    }
    this.isLoaded=true
    
}
setId(id:number){
  this.id = id
}



}

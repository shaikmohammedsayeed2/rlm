import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiMethod, AuthEndPoints } from 'src/app/core/constant/api-constant';
import { HttpService } from 'src/app/core/service/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class LandingPageService {

  constructor(private httpService:HttpService) { }
  public getLandingPageDetails(lab_id:any){
    return this.httpService.requestCall(
      ApiMethod.GET,
      AuthEndPoints.GET_LANDING_PAGE_DETAILS,
      '',
      lab_id      
    )
  }

  public sendFeedBack(data:any){
    return this.httpService.requestCall(
      ApiMethod.POST,
      AuthEndPoints.SEND_FEEDBACK,
      data,
      ''      
    );
  }

  public updateLabCoreDetails(lab_id:any,data:any){
    return this.httpService.requestCall(
      ApiMethod.PUT,
      AuthEndPoints.UPDATE_LAB_CORE_DETAILS,
      data,
      lab_id      
    );
  }

  public uploadSliderImage(data:any){
    return this.httpService.requestCall(
      ApiMethod.POST,
      AuthEndPoints.UPLOAD_SLIDER,
      data,
      ''      
    );
  }

  public deleteSliderImage(slider_id:any){
    return this.httpService.requestCall(
      ApiMethod.DELETE,
      AuthEndPoints.DELETE_SLIDER,
      '',
      slider_id      
    );
  }

  public getAllFeedback(lab_id:any){
    return this.httpService.requestCall(
      ApiMethod.GET,
      AuthEndPoints.GET_ALL_FEEDBACK,
      '',
      lab_id      
    );
  }

  public multiDeleteFeedback(data:any){
    const options = { body: data };
    return this.httpService.requestCall(
      ApiMethod.DELETE,
      AuthEndPoints.MULTI_DELETE_FEEDBACK,
      '',
      '',
      options   
    );
  }

 
  
}

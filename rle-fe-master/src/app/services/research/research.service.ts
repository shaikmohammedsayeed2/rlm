import { Injectable } from '@angular/core';
import { ApiMethod, AuthEndPoints } from 'src/app/core/constant/api-constant';
import { HttpService } from 'src/app/core/service/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class ResearchService {

  constructor(private httpService:HttpService) { }

  public getResearchDetails(lab_id:any){
      return this.httpService.requestCall(
        ApiMethod.GET,
        AuthEndPoints.GET_RESEARCH,
        '',
        lab_id    
      );
    }
    public getAllPublications(lab_id:any){
      return this.httpService.requestCall(
        ApiMethod.GET,
        AuthEndPoints.GET_ALL_PUBLICATIONS,
        '',
        lab_id    
      );
    }
    public getAllConferences(lab_id:any){
      return this.httpService.requestCall(
        ApiMethod.GET,
        AuthEndPoints.GET_ALL_CONFERENCES,
        '',
        lab_id    
      );
    }
    public addPublication(data:any){
      return this.httpService.requestCall(
        ApiMethod.POST,
        AuthEndPoints.ADD_PUBLICATION,
        data,
        '',
      { withCredentials: true }
      )
    }

    deletePublication(id:any){
      return this.httpService.requestCall(
        ApiMethod.DELETE,
        AuthEndPoints.DELETE_PUBLICATION,
        '',
        id,
        { withCredentials: true }
      )
    }

    updatePublication(data:any,pub_id:any){
      return this.httpService.requestCall(
        ApiMethod.PUT,
        AuthEndPoints.UPDATE_PUBLICATION,
        data,
        pub_id
      )
    }
    public addConference(data:any){
      return this.httpService.requestCall(
        ApiMethod.POST,
        AuthEndPoints.ADD_CONFERENCE,
        data,
        ''
      )
    }

    deleteConference(id:any){
      return this.httpService.requestCall(
        ApiMethod.DELETE,
        AuthEndPoints.DELETE_CONFERENCE,
        '',
        id
      )
    }

    updateConference(data:any,pub_id:any){
      return this.httpService.requestCall(
        ApiMethod.PUT,
        AuthEndPoints.UPDATE_CONFERENCE,
        data,
        pub_id
      )
    }
    
  
}

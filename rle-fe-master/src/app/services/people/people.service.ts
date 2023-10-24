import { Injectable } from '@angular/core';
import { ApiMethod, AuthEndPoints } from 'src/app/core/constant/api-constant';
import { HttpService } from 'src/app/core/service/http/http.service';

@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  constructor(private httpService:HttpService) { }
  getAllPeople(lab_id:any)
  {
    return this.httpService.requestCall(
      ApiMethod.GET,
      AuthEndPoints.GET_ALL_PEOPLE,
      '',
      lab_id      
    );
  }

  getProfile(person_id:any)
  {
    return this.httpService.requestCall(
      ApiMethod.GET,
      AuthEndPoints.GET_PROFILE,
      '',
      person_id
    )
  }

  addPeople(data:any)
  {
    return this.httpService.requestCall(
      ApiMethod.POST,
      AuthEndPoints.ADD_PERSON,
      data,
      ''
    )
  }

  updatePerson(data:any,person_id:any){
    return this.httpService.requestCall(
      ApiMethod.PUT,
      AuthEndPoints.UPDATE_PERSON,
      data,
      person_id
    )
  }

  deleteLabMember(person_id:any){
    return this.httpService.requestCall(
      ApiMethod.DELETE,
      AuthEndPoints.DELETE_LAB_MEMBER,
      '',
      person_id
    )
  }

  getAllLabs()
  {
    return this.httpService.requestCall(ApiMethod.GET,AuthEndPoints.GET_ALL_LABS,'','');
  }
  public addNewLab(data:any){
    return this.httpService.requestCall(
      ApiMethod.POST,
      AuthEndPoints.ADD_LAB,
      data,
      ''      
    );
  }

  public deleteLab(lab_id:any){
    return this.httpService.requestCall(
      ApiMethod.DELETE,
      AuthEndPoints.DELETE_LAB,
      '',
      lab_id
    );
  }
}

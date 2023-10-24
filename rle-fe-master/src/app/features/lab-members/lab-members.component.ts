import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalLabId } from 'src/app/core/constant/global-id';
import { PeopleService } from 'src/app/services/people/people.service';

@Component({
  selector: 'app-lab-members',
  templateUrl: './lab-members.component.html',
  styleUrls: ['./lab-members.component.scss']
})
export class LabMembersComponent implements OnInit {
  lab_id:any
  facultyList:any
  studentsList:any
  sponsorsList:any
  isLoaded:boolean = false
  constructor(private peopleService:PeopleService,
    private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.lab_id = this.route.parent?.snapshot.paramMap.get('lab_id');
    console.log(this.lab_id,'lab_id')
    this.getAllLabMemberDetails(this.lab_id)
  }
  getAllLabMemberDetails(lab_id:any){
  this.peopleService.getAllPeople(lab_id)?.subscribe((res:any)=>{
    console.log('entire response',res)
    this.facultyList = res.filter((data: { user_role_name: string; }) => data.user_role_name =='faculty');
    this.studentsList = res.filter((data: { user_role_name: string; }) => data.user_role_name =='student');
    this.sponsorsList = res.filter((data: { user_role_name: string; }) => data.user_role_name =='sponsor');
    this.isLoaded = true
  })
  }
}

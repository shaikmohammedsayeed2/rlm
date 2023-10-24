import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { LandingPageService } from 'src/app/services/landingpage/landing-page.service';

@Component({
  selector: 'app-admin-feedback',
  templateUrl: './admin-feedback.component.html',
  styleUrls: ['./admin-feedback.component.scss']
})
export class AdminFeedbackComponent implements OnInit{
  public columns!: Columns[];
  data: any[] = [];
  allSelected = false;
  public configuration!: Config;
  lab_id:any

  constructor(private landingPageService:LandingPageService,
              public route:ActivatedRoute) {}
  ngOnInit(): void {
    this.lab_id = this.route.parent?.snapshot.paramMap.get('lab_id');
    this.getAllFeedback(this.lab_id)
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    this.configuration.checkboxes = true;
    this.columns = [
      { key: 'name', title: 'Name' },
      { key: 'email', title: 'Email' },
      { key: 'subject', title: 'Subject' },
      { key: 'message', title: 'Message' },
    ];
  }

  getAllFeedback(lab_id:any){
    this.landingPageService.getAllFeedback(lab_id)?.subscribe((data:any)=>{
      console.log(data)
      this.data = data
    })
  }
  tableEventEmitted(event: { event: string; value: any }): void {
    if (event.event === 'onSelectAll') {
      this.data.forEach((row: any) => (row.selected = event.value));
      this.selectedArrayIds = []
    this.selectedArrayIds.push(...this.data.filter((row) => row.selected).map(x => x.id));
    }
  }
selectedArrayIds:any = []
  rowSelected(): void {
    this.allSelected = this.data.every((row) => !!row.selected);
    this.selectedArrayIds = []
    this.selectedArrayIds.push(...this.data.filter((row) => row.selected).map(x => x.id));
  }

  multiDeleteFeedback(){
    console.log(this.selectedArrayIds)
    this.landingPageService.multiDeleteFeedback(this.selectedArrayIds)?.subscribe((res:any)=>{
      console.log(res)
      if(res.success){
        this.getAllFeedback(this.lab_id)
      }
    })
  }

}

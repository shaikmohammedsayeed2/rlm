import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Config, Columns, DefaultConfig } from 'ngx-easy-table';
import { ResearchService } from 'src/app/services/research/research.service';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})
export class ConferencesComponent implements OnInit {
  lab_id:any
  conferences:any
  public configuration!: Config;
  public columns!: Columns[];
  constructor(private researchService:ResearchService,
    private route: ActivatedRoute,
  ) { }
  ngOnInit(): void {
    this.lab_id = this.route.parent?.snapshot.paramMap.get('lab_id');
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    // ... etc.
    this.columns = [
      { key: 'conf_title', title: 'Conference Title' },
      { key: 'description', title: 'Description' },
      { key: 'blob_storage', title: 'PDF LINK' },
      {key:'start_date',title:'Start Date'},
      {key:'end_date',title:'End Date'},
    ];
    this.getAllConferences(this.lab_id)
  }
  getAllConferences(lab_id:any){
    this.researchService.getAllConferences(lab_id)?.subscribe((res:any)=>{
      console.log(res)
      this.conferences = res
    })
  }
}

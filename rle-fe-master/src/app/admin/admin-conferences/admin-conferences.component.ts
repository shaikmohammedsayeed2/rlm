import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Config, Columns, DefaultConfig } from 'ngx-easy-table';
import { ResearchService } from 'src/app/services/research/research.service';

@Component({
  selector: 'app-admin-conferences',
  templateUrl: './admin-conferences.component.html',
  styleUrls: ['./admin-conferences.component.scss'],
  providers: [DatePipe]
})
export class AdminConferencesComponent implements OnInit{
  constructor(private researchService:ResearchService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
     ) { }
  public configuration!: Config;
  public columns!: Columns[];
 selectedRow:any = null;
  lab_id:any
  todayDate = new Date();
  
  allConfData:any
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
      {key:'Actions',title:'Actions'}
    ];
    this.publicationform = new FormGroup({
      confTitle: new FormControl(""),
      confDescription: new FormControl(""),
      confPdfUrl : new FormControl(""),
      confStartDate: new FormControl(""),
      confEndDate: new FormControl(""),
    });
    this.getAllConferences(this.lab_id);
  }
  publicationform!:FormGroup
  
  getAllConferences(lab_id:any){
  this.researchService.getAllConferences(lab_id)?.subscribe((data:any)=>{  
    this.allConfData = data
  })
  }

  onConferenceSubmit(data:any){
    if(this.selectedRow == null){
      var pubdata = 
      {
        "conf_title": data.confTitle,
        "description": data.confDescription,
        "lab_id": this.lab_id,
        "conf_pdf": data.confPdfUrl ,
        "start_date":data.confStartDate,
        "end_date":data.confEndDate,
      };
      console.log(pubdata,"pubdata")
      this.researchService.addConference(pubdata)?.subscribe((data:any)=>{
        console.log(data)
        this.getAllConferences(this.lab_id);
        this.publicationform.reset();
        this.selectedRow = null;
      })
    }
    else{
      var updatePubData = {
        "conf_title": data.confTitle,
        "description": data.confDescription,
        "lab_id": this.lab_id,
       "start_date":data.confStartDate,
        "end_date":data.confEndDate,
        "conf_pdf": data.confPdfUrl 
      }
      var pub_id = this.selectedRow.id
      this.researchService.updateConference(updatePubData,pub_id)?.subscribe((data:any)=>{
        console.log(data)
        this.getAllConferences(this.lab_id);
        this.publicationform.reset();
        this.selectedRow = null;
      })
    }
  }
  onEditClick(row:any){
    this.selectedRow = row
    this.publicationform.patchValue({
      confTitle: this.selectedRow.conf_title,
      confDescription: this.selectedRow.description,
      confPdfUrl : this.selectedRow.blob_storage,
      confStartDate: this.selectedRow.start_date,
      confEndDate: this.selectedRow.end_date,
    });
  }
 
  clearForm(){
    this.selectedRow = null;
  this.publicationform.reset();
  }

  changeJournal(e: any) {
    this.pubType?.setValue(e.target.value, {
      onlySelf: true,
    });
  }
  // Access formcontrols getter
  get pubType() {
    return this.publicationform.get('pubType');
  }
  onDeleteClick(row:any){
    console.log(this.selectedRow)
    this.selectedRow = row
    let pub_id = this.selectedRow.id
    this.researchService.deleteConference(pub_id)?.subscribe((data:any)=>{
      this.getAllConferences(this.lab_id);
      this.publicationform.reset();
    })
  }
}
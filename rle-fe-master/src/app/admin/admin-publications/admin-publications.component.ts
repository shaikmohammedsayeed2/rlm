import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Columns, Config, DefaultConfig } from 'ngx-easy-table';
import { ResearchService } from 'src/app/services/research/research.service';

@Component({
  selector: 'app-admin-publications',
  templateUrl: './admin-publications.component.html',
  styleUrls: ['./admin-publications.component.scss'],
  providers: [DatePipe]
})
export class AdminPublicationsComponent implements OnInit{
  constructor(private researchService:ResearchService,
    private route: ActivatedRoute,
    private datePipe: DatePipe
     ) { }
  public configuration!: Config;
  public columns!: Columns[];
 selectedRow:any = null;
  lab_id:any
  todayDate = new Date();
  
  allPubData:any
  ngOnInit(): void {
  this.lab_id = this.route.parent?.snapshot.paramMap.get('lab_id');
    this.configuration = { ...DefaultConfig };
    this.configuration.searchEnabled = true;
    // ... etc.
    this.columns = [
      { key: 'pub_title', title: 'Publication Title' },
      { key: 'description', title: 'Description' },
      { key: 'blob_storage', title: 'PDF LINK' },
      { key: 'type', title: 'Publication Type' },
      {key:'Actions',title:'Actions'}
    ];
    this.publicationform = new FormGroup({
      pubTitle: new FormControl(""),
      pubDescription: new FormControl(""),
      pubPdfUrl : new FormControl(""),
      pubType: new FormControl(""),
    });
    this.getAllPublications(this.lab_id);
  }
  publicationform!:FormGroup
  
  getAllPublications(lab_id:any){
  this.researchService.getAllPublications(lab_id)?.subscribe((data:any)=>{  
    this.allPubData = data
  })
  }

  onPublicationFormSubmit(data:any){
    if(this.selectedRow == null){
      var pubdata = 
      {
        "pub_title": data.pubTitle,
        "description": data.pubDescription,
        "lab_id": this.lab_id,
        "type": data.pubType,
        "pub_date":this.datePipe.transform(this.todayDate, 'yyyy-MM-dd') ,
        "pub_pdf": data.pubPdfUrl 
      };
      console.log(pubdata,"pubdata")
      this.researchService.addPublication(pubdata)?.subscribe((data:any)=>{
        console.log(data)
        this.getAllPublications(this.lab_id);
        this.publicationform.reset();
        this.selectedRow = null;
      })
    }
    else{
      var updatePubData = {
        "pub_title": data.pubTitle,
        "description": data.pubDescription,
        "lab_id": this.lab_id,
        "type": data.pubType,
        "pub_date":this.datePipe.transform(this.todayDate, 'yyyy-MM-dd') ,
        "pub_pdf": data.pubPdfUrl 
      }
      var pub_id = this.selectedRow.id
      this.researchService.updatePublication(updatePubData,pub_id)?.subscribe((data:any)=>{
        this.getAllPublications(this.lab_id);
        this.publicationform.reset();
        this.selectedRow = null;
      })
    }
  }
  onEditClick(row:any){
    this.selectedRow = row
    this.publicationform.patchValue({
      pubTitle: this.selectedRow.pub_title,
      pubDescription: this.selectedRow.description,
      pubPdfUrl : this.selectedRow.blob_storage,
      pubType: this.selectedRow.type,
    });
  }
  onEvent(event: { event: string; value: any }): void {
    this.selectedRow = event.value.row
   
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
    let pub_id = row.id
    this.researchService.deletePublication(pub_id)?.subscribe((data:any)=>{
      this.getAllPublications(this.lab_id);
      this.publicationform.reset();
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResearchService } from 'src/app/services/research/research.service';
// declare var activateCSE:any;


@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.scss']
})
export class PublicationsComponent implements OnInit{
  lab_id:any
  publicationsList:any
  constructor(private researchService:ResearchService,
    private route: ActivatedRoute,
    private router: Router) { }
  ngOnInit(): void {
    this.lab_id = this.route.parent?.snapshot.paramMap.get('lab_id');
    this.getAllPublications(this.lab_id)
    // new activateCSE();

  }
  getAllPublications(lab_id:any){
    this.researchService.getAllPublications(lab_id)?.subscribe((res:any)=>{
      this.publicationsList = res
    })
  }

}

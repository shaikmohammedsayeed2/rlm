import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResearchService } from 'src/app/services/research/research.service';

@Component({
  selector: 'app-conf-publ',
  templateUrl: './conf-publ.component.html',
  styleUrls: ['./conf-publ.component.scss']
})
export class ConfPublComponent implements OnInit{
  constructor(public researchService:ResearchService,
    public route: ActivatedRoute,
    public router: Router) { }
  public lab_id:any
  public recentPublications:any
  public upcomingConferences:any
  ngOnInit(): void {
    this.lab_id = this.route.parent?.snapshot.paramMap.get('lab_id');
    this.getResearchDetails(this.lab_id)
  }
  getResearchDetails(lab_id:any){
    this.researchService.getResearchDetails(lab_id)?.subscribe((res:any)=>{
      console.log('res',res)
      this.recentPublications = res.top_5_papers
      this.upcomingConferences = res.upcoming_conference
    })
  }
  openPdf(url:any){
    window.open(url, "_blank");
  }
  viewMore(link:any){
    this.router.navigateByUrl(link);
  }
}

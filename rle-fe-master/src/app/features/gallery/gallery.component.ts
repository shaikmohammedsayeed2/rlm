import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GalleryConfig, GalleryItem, ImageItem } from 'ng-gallery';
import { GalleryService } from 'src/app/services/gallery/gallery.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit{
  lab_id:any
  isLoaded = false;
  imagegallery:any
  config: GalleryConfig | undefined;
  images!: GalleryItem[];
  imageData2 = [
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxqIx_mRW4_D2ZYyja19Oz6wu7pe6fC4S5sJSBtAkZUYIV7VnLNy-xh1SJZaus48Z6T08pUHXup74&usqp=CAU&ec=48665699",
    "https://mec.edu.in/wp-content/uploads/2020/12/26-mech.jpg"
  ];
  galleryList:any
  imagesList:any;
  myScriptElement: HTMLScriptElement;
  constructor(private galleryService:GalleryService,
    private route: ActivatedRoute) { 
      this.myScriptElement = document.createElement("script");
      this.myScriptElement.src = "https://cse.google.com/cse.js?cx=4579cd520ae3c4467";
      document.body.appendChild(this.myScriptElement);
    }

  ngOnInit(): void {
    this.lab_id = this.route.parent?.snapshot.paramMap.get('lab_id');
    this.getGallery(this.lab_id)
  }
  getGallery(lab_id:any){
    this.galleryService.getGallery(lab_id)?.subscribe((res:any)=>{
      console.log(res)
      this.imagegallery = res
      this.galleryList = []
      this.imagegallery.forEach((value:any, index1:any) => {
        let imagesList = value.images
        this.galleryList[index1] = []
        imagesList.forEach((value:any, index2:any) => {

          this.galleryList[index1][index2]=new ImageItem({ src: value.url});
      });
      console.log(this.galleryList)
    });
    console.log(this.galleryList)
      this.isLoaded = true;
    })
  }

}


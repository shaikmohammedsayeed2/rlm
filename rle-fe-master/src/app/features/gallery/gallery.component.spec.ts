import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { GalleryComponent } from './gallery.component';
import { GalleryService } from 'src/app/services/gallery/gallery.service';
import { of } from 'rxjs';
import { GalleryItem, ImageItem } from 'ng-gallery';

describe('GalleryComponent', () => {
  let component: GalleryComponent;
  let fixture: ComponentFixture<GalleryComponent>;
  let galleryServiceSpy: jasmine.SpyObj<GalleryService>;

  beforeEach(async () => {
    const galleryService = jasmine.createSpyObj('GalleryService', ['getGallery']);

    await TestBed.configureTestingModule({
      declarations: [GalleryComponent],
      providers: [
        { provide: GalleryService, useValue: galleryService },
        {
          provide: ActivatedRoute,
          useValue: {
            parent: {
              snapshot: {
                paramMap: {
                  get: () => '123', // set the lab_id to 123
                },
              },
            },
          },
        },
      ],
    }).compileComponents();

    galleryServiceSpy = TestBed.inject(GalleryService) as jasmine.SpyObj<GalleryService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

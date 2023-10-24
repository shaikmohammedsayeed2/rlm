import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GalleryService } from './gallery.service';
import { ApiMethod, AuthEndPoints } from 'src/app/core/constant/api-constant';
import { HttpService } from 'src/app/core/service/http/http.service';
import { ToastrModule, ToastrService, } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

describe('GalleryService', () => {
  let service: GalleryService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [GalleryService, HttpService, ToastrService ],
    });
    service = TestBed.inject(GalleryService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return gallery data', () => {
    const lab_id = '123';
    const mockResponse = { data: [{ id: 1, name: 'image1' }, { id: 2, name: 'image2' }] };
    service.getGallery(lab_id)?.subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${AuthEndPoints.GET_GALLERY}${lab_id}`);
    
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should upload image', () => {
    const lab_id = '123';
    const file = new File(['sample file content'], 'sample.jpg', { type: 'image/jpeg' });
    const mockResponse = { success: true };
    service.uploadImage(file)?.subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${AuthEndPoints.UPLOAD_IMAGE}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body.get('file')).toEqual(file);
    req.flush(mockResponse);
  });
});


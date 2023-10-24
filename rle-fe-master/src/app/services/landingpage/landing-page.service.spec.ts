import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LandingPageService } from './landing-page.service';
import { ApiMethod, AuthEndPoints } from 'src/app/core/constant/api-constant';
import { environment } from 'src/environments/environment';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/core/service/http/http.service';

describe('LandingPageService', () => {
  let service: LandingPageService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [LandingPageService,HttpService, ToastrService]
    });
    service = TestBed.inject(LandingPageService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call GET API for getting landing page details', () => {
    const labId = 'lab123';
    const response = { some: 'response' };
    service.getLandingPageDetails(labId)?.subscribe(res => {
      expect(res).toEqual(response);
    });
    const req = httpMock.expectOne(`${environment.apiUrl}${AuthEndPoints.GET_LANDING_PAGE_DETAILS}${labId}`);

    expect(req.request.method).toBe('GET');
    req.flush(response);
  });

  it('should call POST API for sending feedback', () => {
    const data = { name: 'sayeed', email: 'cs19btech11004@iith.ac.in', message: 'this is my feedback' };
    const response = { message: 'Feedback sent successfully' };
    service.sendFeedBack(data)?.subscribe(res => {
      expect(res).toEqual(response);
    });
    const req = httpMock.expectOne(`${environment.apiUrl}${AuthEndPoints.SEND_FEEDBACK}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(data);
    req.flush(response);
  });

  it('should call PUT API for updating lab core details', () => {
    const labId = 'lab123';
    const data = { title: 'New title', description: 'New description' };
    const response = { message: 'Lab core details updated successfully' };
    service.updateLabCoreDetails(labId, data)?.subscribe(res => {
      expect(res).toEqual(response);
    });
    
    const req = httpMock.expectOne(`${environment.apiUrl}${AuthEndPoints.UPDATE_LAB_CORE_DETAILS}${labId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toBe(data);
    req.flush(response);
  });

  it('should call POST API for uploading slider image', () => {
    const data = new FormData();
    data.append('file', new File([''], 'test.jpg'));
    const response = { message: 'Slider image uploaded successfully' };
    service.uploadSliderImage(data)?.subscribe(res => {
      expect(res).toEqual(response);
    });
    
    const req = httpMock.expectOne(`${environment.apiUrl}${AuthEndPoints.UPLOAD_SLIDER}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toBe(data);
    req.flush(response);
  });

  it('should call DELETE API for deleting slider image', () => {
    const sliderId = 'slider123';
    const response = { message: 'Slider image deleted successfully' };
    service.deleteSliderImage(sliderId)?.subscribe(res => {
      expect(res).toEqual(response);
    });
    const req = httpMock.expectOne(`${environment.apiUrl}${AuthEndPoints.DELETE_SLIDER}${sliderId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(response);
  });

});



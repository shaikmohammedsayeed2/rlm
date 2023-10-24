import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ResearchService } from './research.service';
import { ApiMethod, AuthEndPoints } from 'src/app/core/constant/api-constant';
import { environment } from 'src/environments/environment';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/core/service/http/http.service';

describe('ResearchService', () => {
  let service: ResearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, ToastrModule.forRoot()],
      providers: [ResearchService, HttpService, ToastrService]
    });
    service = TestBed.inject(ResearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return research details', () => {
    const lab_id = 1;
    const mockResponse = { /* write mock data*/ };
    service.getResearchDetails(lab_id)?.subscribe(res => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}${AuthEndPoints.GET_RESEARCH}${lab_id}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should retrieve all conferences', () => {
    const lab_id = 1;
    const mockConferences = [
      { id: 1, title: 'Conference 1', date: '2022-06-15', location: 'London' },
      { id: 2, title: 'Conference 2', date: '2022-09-22', location: 'New York' }
    ];

    service.getAllConferences(lab_id)?.subscribe(conferences => {
      expect(conferences).toEqual(mockConferences);
    });

    const request = httpMock.expectOne(`${environment.apiUrl}${AuthEndPoints.GET_ALL_CONFERENCES}${lab_id}`);
    expect(request.request.method).toBe('GET');

    request.flush(mockConferences);
  });

  it('should add publication', () => {
    const data = { title: 'Test Publication', author: 'Test Author' };
    service.addPublication(data)?.subscribe((response: any) => {
      expect(response.status).toBe(200);
      expect(response.body).toEqual(data);
    });

    const request = httpMock.expectOne(`${environment.apiUrl}${AuthEndPoints.ADD_PUBLICATION}`);
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(data);
    request.flush({ status: 200, body: data });
  });
});

import { TestBed } from '@angular/core/testing';
import { HttpService } from 'src/app/core/service/http/http.service';
import { ApiMethod, AuthEndPoints } from 'src/app/core/constant/api-constant';
import { PeopleService } from './people.service';

describe('PeopleService', () => {
  let service: PeopleService;
  let httpServiceSpy: jasmine.SpyObj<HttpService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpService', ['requestCall']);

    TestBed.configureTestingModule({
      providers: [
        PeopleService,
        { provide: HttpService, useValue: spy }
      ]
    });
    service = TestBed.inject(PeopleService);
    httpServiceSpy = TestBed.inject(HttpService) as jasmine.SpyObj<HttpService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAllPeople', () => {
    it('should call httpService.requestCall with the correct parameters', () => {
      const labId = 'lab123';

      service.getAllPeople(labId);

      expect(httpServiceSpy.requestCall).toHaveBeenCalledWith(
        ApiMethod.GET,
        AuthEndPoints.GET_ALL_PEOPLE,
        '',
        labId
      );
    });
  });

  describe('getProfile', () => {
    it('should call httpService.requestCall with the correct parameters', () => {
      const personId = 'person123';

      service.getProfile(personId);

      expect(httpServiceSpy.requestCall).toHaveBeenCalledWith(
        ApiMethod.GET,
        AuthEndPoints.GET_PROFILE,
        '',
        personId
      );
    });
  });
});


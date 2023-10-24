import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { LabMembersComponent } from './lab-members.component';
import { RouterTestingModule } from '@angular/router/testing';
import { FeaturesModule } from '../features.module';
import { PeopleService } from 'src/app/services/people/people.service';

describe('LabMembersComponent', () => {
  let component: LabMembersComponent;
  let fixture: ComponentFixture<LabMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports:[
          RouterTestingModule,
          HttpClientTestingModule,
          FeaturesModule
        ],
      declarations: [ LabMembersComponent ],
      providers: [
        {
          PeopleService,
          provide: ActivatedRoute,
          useValue: {
            parent: {
              snapshot: {
                paramMap: {
                  get: (param: string) => 'test_lab_id'
                }
              }
            }
          }
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LabMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render faculty section', () => {
    component.facultyList = [
      {
        profile_url: 'https://example.com/faculty1.jpg',
        name: 'Amogh',
        roll_number: 'cs19btech11031',
        github_url: 'https://github.com/faculty1',
        personal_web_url: 'https://faculty1.example.com',
        linkedin_url: 'https://linkedin.com/in/faculty1'
      },
      {
        profile_url: 'https://example.com/faculty2.jpg',
        name: 'Sayeed',
        roll_number: 'cs19btech11004',
        github_url: 'https://github.com/faculty2',
        personal_web_url: 'https://faculty2.example.com',
        linkedin_url: 'https://linkedin.com/in/faculty2'
      }
    ];

    fixture.detectChanges();

    const facultyElements = fixture.nativeElement.querySelectorAll('.member h4');
    expect(facultyElements.length).toEqual(2);
    expect(facultyElements[0].textContent).toContain('Amogh');
    expect(facultyElements[1].textContent).toContain('Sayeed');

    const socialElements = fixture.nativeElement.querySelectorAll('.member .social a');
    expect(socialElements.length).toEqual(6);
  });

  it('should render students section', () => {
    component.studentsList = [
      {
        profile_url: 'https://example.com/student1.jpg',
        name: 'Vardhan',
        roll_number: 'cs19btech11052',
        github_url: 'https://github.com/student1',
        personal_web_url: 'https://student1.example.com',
        linkedin_url: 'https://linkedin.com/in/student1'
      },
      {
        profile_url: 'https://example.com/student2.jpg',
        name: 'Nikhilesh',
        roll_number: 'es19btech11030',
        github_url: 'https://github.com/student2',
        personal_web_url: 'https://student2.example.com',
        linkedin_url: 'https://linkedin.com/in/student2'
      }
    ];

    fixture.detectChanges();

    const studentElements = fixture.nativeElement.querySelectorAll('.member h4');
    expect(studentElements.length).toEqual(2);
    expect(studentElements[0].textContent).toContain('Vardhan');
    expect(studentElements[1].textContent).toContain('Nikhilesh');

    const socialElements = fixture.nativeElement.querySelectorAll('.member .social a');
    expect(socialElements.length).toEqual(6);
  });

});

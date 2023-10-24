import { NgModule } from '@angular/core';
import {  RouterModule, Routes } from '@angular/router';
import { ConfPublComponent } from './features/conf-publ/conf-publ.component';
import { GalleryComponent } from './features/gallery/gallery.component';
import { LabMembersComponent } from './features/lab-members/lab-members.component';
import { LandingPageComponent } from './features/landing-page/landing-page.component';
import { LayoutComponent } from './features/layout/layout.component';
import { LoginComponent } from './features/login/login.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
import { AdminLandingPageComponent } from './admin/admin-landing-page/admin-landing-page.component';
import { AdminPublicationsComponent } from './admin/admin-publications/admin-publications.component';
import { AdminPeopleComponent } from './admin/admin-people/admin-people.component';
import { AdminGalleryComponent } from './admin/admin-gallery/admin-gallery.component';
import { AdminAdmissionsComponent } from './admin/admin-admissions/admin-admissions.component';
import { AdminConferencesComponent } from './admin/admin-conferences/admin-conferences.component';
import { PublicationsComponent } from './features/publications/publications.component';
import { ConferencesComponent } from './features/conferences/conferences.component';
import { AdminProfileComponent } from './admin/admin-profile/admin-profile.component';
import { AuthguardGuard } from './core/shared/guard/authguard.guard';
import { AdminFeedbackComponent } from './admin/admin-feedback/admin-feedback.component';
import { AdminLabComponent } from './admin/admin-lab/admin-lab.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'features/1/home',
    pathMatch: 'full'
  },
  {
    path: 'features/:lab_id',
  component: LayoutComponent,
  children: [
    {
      path:'home',
      component: LandingPageComponent,
    },
    {
        path:'research',
        component: ConfPublComponent
    },
    {
      path:'research/publications',
      component: PublicationsComponent
    },
    {
      path:'research/conferences',
      component: ConferencesComponent
    },
    {
      path:'people',
      component:LabMembersComponent
    },
    {
      path:'login',
      component:LoginComponent
    },
    {
      path:'gallery',
      component:GalleryComponent
    }
  ]
  },
  {
    path: 'admin/:lab_id',
  component: AdminLayoutComponent,
  canActivate:[AuthguardGuard],
  children: [
    {
      path:'home',
      component: AdminLandingPageComponent,
    },
    {
        path:'research/publications',
        component: AdminPublicationsComponent
    },
    {
      path:'research/conferences',
      component: AdminConferencesComponent
    },
    {
      path:'people',
      component:AdminPeopleComponent
    },
    {
      path:'gallery',
      component:AdminGalleryComponent
    },
    {
      path:'admissions',
      component:AdminAdmissionsComponent
    },
    {
      path:'profile',
      component:AdminProfileComponent
    },
    {
      path:'feedback',
      component:AdminFeedbackComponent
    },
    {
      path:'addlab',
      component:AdminLabComponent
    }
  ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,{scrollPositionRestoration: 'enabled',useHash:true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

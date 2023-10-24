import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LabMembersComponent } from './lab-members/lab-members.component';
import { ConfPublComponent } from './conf-publ/conf-publ.component';
import { LoginComponent } from './login/login.component';
import { RouterModule } from '@angular/router';
import { GalleryModule } from 'ng-gallery';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryComponent } from './gallery/gallery.component';
import { AdminModule } from '../admin/admin.module';
import { PublicationsComponent } from './publications/publications.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { TruncatePipe } from '../truncate.pipe';
import { ConferencesComponent } from './conferences/conferences.component';
import { GoogleLoginProvider, GoogleSigninButtonModule, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { CookieService } from 'ngx-cookie-service';
import { TableModule } from 'ngx-easy-table';

@NgModule({
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    LandingPageComponent,
    LabMembersComponent,
    ConfPublComponent,
    LoginComponent,
    GalleryComponent,
    PublicationsComponent,
    TruncatePipe,
    ConferencesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    GalleryModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgxExtendedPdfViewerModule ,
    SocialLoginModule ,
    GoogleSigninButtonModule,
    TableModule
  ],
  exports:[TruncatePipe],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '658208509868-eobuvr8pnb5k1knq91cq27tl794rp67l.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err: any) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    CookieService
  ]
})
export class FeaturesModule { }

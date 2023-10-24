import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { GalleryModule } from 'ng-gallery';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterConfig, NgxUiLoaderRouterModule, PB_DIRECTION, POSITION, SPINNER } from 'ngx-ui-loader';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';
import { AdminModule } from './admin/admin.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { TableModule } from 'ngx-easy-table';
import { httpInterceptorProviders } from './core/service/http/http.interceptor';


const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'red',
  bgsType: SPINNER.threeStrings,
  blur: 25,
  fastFadeOut: true,
  fgsColor: 'red',
  fgsType: SPINNER.squareJellyBox,
  pbColor: 'red',
  pbThickness: 5,
  hasProgressBar: true,
};
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LazyLoadImageModule,
    FeaturesModule,
    AdminModule,
    CoreModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule.forRoot({ showForeground: true }),    
    HttpClientModule,
    GalleryModule,
    FormsModule ,
    ReactiveFormsModule ,
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    TableModule,
    
    
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import {BrowserModule, Title} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router';
import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthLoginComponent } from './auth-login/login.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import {NotifyService} from "./notify.service";
import {HttpRequestInterceptor} from "./middleware/http-request-interceptor";
import {AppService} from "./app.service";
import {ReactiveFormsModule} from "@angular/forms";
import {NotifierModule} from "angular-notifier";
import { LayoutHeaderComponent } from './layout-header/layout-header.component';
import {IconsModule} from "./icons.module";
import {AuthRegisterComponent} from "./auth-register/auth-register.component";
import { DashboardComponent } from './dashboard/dashboard.component';
import { NetworkFormComponent } from './network-form/network-form.component';
import { TargetFormComponent } from './target-form/target-form.component';
import { TargetComponent } from './target/target.component';
import { TargetBlocksStandardComponent } from './target-blocks-standard/target-blocks-standard.component';
import { TargetBlockNewComponent } from './target-block-new/target-block-new.component';
import { TargetBlocksServicesComponent } from './target-blocks-services/target-blocks-services.component';
import { TargetBlocksServicesFormComponent } from './target-blocks-services-form/target-blocks-services-form.component';
import { TargetTimelineComponent } from './target-timeline/target-timeline.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsApiKeyComponent } from './settings-api-key/settings-api-key.component';
import { TargetAttackVectorsComponent } from './target-attack-vectors/target-attack-vectors.component';
import { TargetGeneralComponent } from './target-general/target-general.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { TargetIdeasComponent } from './target-ideas/target-ideas.component';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GalleryModule } from  'ng-gallery';
import { LightboxModule } from  'ng-gallery/lightbox';
import { TargetBlockStandardComponent } from './target-block-standard/target-block-standard.component';
import { ConfirmationDialogService } from './services/confirmation-dialog.service';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: IndexComponent },
      { path: 'login', component: AuthLoginComponent },
      { path: 'register', component: AuthRegisterComponent },

      { path: 'dashboard', component: DashboardComponent },
      { path: 'settings', component: SettingsComponent },

      { path: 'users/:user_id/networks/new', component: NetworkFormComponent },
      { path: 'users/:user_id/networks/:id/edit', component: NetworkFormComponent },
      { path: 'users/:user_id/networks/:network_id/targets/new', component: TargetFormComponent },
      { path: 'users/:user_id/networks/:network_id/targets/:id/edit', component: TargetFormComponent },
      { path: 'users/:user_id/networks/:network_id/targets/:id/show', component: TargetComponent }
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    LayoutComponent,
    AuthLoginComponent,
    AuthRegisterComponent,
    LayoutHeaderComponent,
    DashboardComponent,
    NetworkFormComponent,
    TargetFormComponent,
    TargetComponent,
    TargetBlocksStandardComponent,
    TargetBlockNewComponent,
    TargetBlocksServicesComponent,
    TargetBlocksServicesFormComponent,
    TargetTimelineComponent,
    SettingsComponent,
    SettingsApiKeyComponent,
    TargetAttackVectorsComponent,
    TargetGeneralComponent,
    TargetIdeasComponent,
    TargetBlockStandardComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgbModule,
    IconsModule,
    HttpClientModule,
    NgSelectModule,
    FormsModule,
    FileUploadModule,
    GalleryModule,
    BrowserAnimationsModule,
    LightboxModule.withConfig({
      panelClass: 'fullscreen'
    }),
    NotifierModule.withConfig({
      "position": {
        "horizontal": {
          "position": "right",
          "distance": 20
        },
        "vertical": {
          "position": "top",
          "distance": 110
        },
      }
    }),
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
  ],
  providers: [
    Title,
    AppService,
    NotifyService,
    ConfirmationDialogService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages'; 
import {NgsRevealModule} from 'ng-scrollreveal';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';

import {VgCoreModule} from 'videogular2/core';
import {VgControlsModule} from 'videogular2/controls';
import {VgOverlayPlayModule} from 'videogular2/overlay-play';
import {VgBufferingModule} from 'videogular2/buffering';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { EventsComponent } from './components/events/events.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { AddEventComponent } from './components/add-event/add-event.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

import { EventService } from './services/event.service';
import { AuthService } from './services/auth.service';
import { SettingsService } from './services/settings.service';
import {UploadFileService} from './upload/upload-file.service';

import { AuthGuard } from './guards/auth.guard';
import { RegisterGuard } from './guards/register.guard';
import { FormUploadComponent } from './upload/form-upload/form-upload.component';
import * as firebase from 'firebase';

// Create Routes
const appRoutes: Routes = [
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent, canActivate:[RegisterGuard]},
  {path:'login', component: LoginComponent},
  {path:'add-event', component: AddEventComponent, canActivate:[AuthGuard]},
  {path:'event/:id', component: EventDetailsComponent},
  {path:'edit-event/:id', component: EditEventComponent, canActivate:[AuthGuard]},
  {path:'settings', component: SettingsComponent, canActivate:[AuthGuard]},
  {path:'**', component: PageNotFoundComponent}
];

AngularFireModule.initializeApp(environment.firebase)

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventsComponent,
    EventDetailsComponent,
    AddEventComponent,
    EditEventComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    PageNotFoundComponent,
    FormUploadComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FlashMessagesModule,
    NgsRevealModule.forRoot(),
    ScrollToModule.forRoot(),
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase, 'eventpanel'),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    AngularFireDatabase,
    AngularFireDatabaseModule,
    EventService,
    AuthService,
    SettingsService,
    AuthGuard,
    RegisterGuard,
    UploadFileService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }

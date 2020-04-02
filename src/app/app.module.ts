import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';
import { HighlightDirective }   from './app.highlightDirective';
import { ModalModule } from './movieModal';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent }    from './app.home';
import { WatchListComponent } from './app.watchList';
import { AboutComponent }   from './app.about';
import { PageDefault }      from './app.pagedefault';
import { MovieImages }      from './app.movieImages';

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent, 
    WatchListComponent,
    AboutComponent, 
    PageDefault, 
    MovieImages, 
    HighlightDirective
  ],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    AppRoutingModule, 
    HttpClientModule, 
    AppRoutingModule, 
    FormsModule,
    AmplifyAngularModule,
    ModalModule
  ],
  providers: [
    AmplifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

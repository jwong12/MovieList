import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';
import { HighlightDirective }   from './directives/app.highlightDirective';
import { ModalModule } from './movieModal';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent }    from './homeComponent/app.home';
import { WatchListComponent } from './watchListComponent/app.watchList';
import { AboutComponent }   from './app.about';
import { StickyHeaderComponent } from './headerComponent/app.stickyHeader';
import { PageDefault }      from './app.pagedefault';
import { MovieImages }      from './directives/app.movieImages';

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent, 
    WatchListComponent,
    AboutComponent, 
    StickyHeaderComponent,
    PageDefault, 
    MovieImages, 
    HighlightDirective
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
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

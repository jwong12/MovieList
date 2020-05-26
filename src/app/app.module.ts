import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AmplifyAngularModule, AmplifyService } from 'aws-amplify-angular';

import { AppRoutingModule } from './app-routing.module';
import { AuthComponent } from './auth/auth.component';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from './directives/app.highlightDirective';
import { ModalModule } from './movieModal';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent }    from './homeComponent/app.home';
import { WatchListComponent } from './watchListComponent/app.watchList';
import { ResultsComponent }   from './resultsComponent/app.results';
import { AboutComponent }   from './app.about';
import { StickyHeaderComponent } from './headerComponent/app.stickyHeader';
import { PageDefault }      from './app.pagedefault';
import { MoviesComponent } from './moviesComponent/app.movies';
import { MovieImages }      from './directives/app.movieImages';

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent, 
    WatchListComponent,
    ResultsComponent,
    AboutComponent, 
    StickyHeaderComponent,
    PageDefault, 
    MoviesComponent,
    MovieImages, 
    HighlightDirective, 
    AuthComponent
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

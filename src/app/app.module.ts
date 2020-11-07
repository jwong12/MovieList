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
import { NgxSpinnerModule } from "ngx-spinner";
import { HttpClientModule } from '@angular/common/http';
import { NgCircleProgressModule } from 'ng-circle-progress';

import { HomeComponent }    from './homeComponent/app.home';
import { WatchListComponent } from './watchListComponent/app.watchList';
import { ResultsComponent }   from './resultsComponent/app.results';
import { StickyHeaderComponent } from './headerComponent/app.stickyHeader';
import { MoviesComponent } from './moviesComponent/app.movies';
import { MovieImages }      from './directives/app.movieImages';
import { AccountComponent } from './accountComponent/account.component';

@NgModule({
  declarations: [
    AppComponent, 
    HomeComponent, 
    WatchListComponent,
    ResultsComponent,
    StickyHeaderComponent,
    MoviesComponent,
    MovieImages, 
    HighlightDirective, 
    AuthComponent, 
    AccountComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule, 
    AppRoutingModule, 
    FormsModule,
    AmplifyAngularModule,
    ModalModule,
    NgxSpinnerModule,
    NgCircleProgressModule.forRoot({
      maxPercent: 100,
      showSubtitle: false,
      radius: 16,
      titleFontSize: "13",
      titleFontWeight: "600",
      titleColor: "#3a3a3a",
      unitsFontWeight: "600",
      unitsColor: "#3a3a3a",
      outerStrokeWidth: 4,
      innerStrokeWidth: 4,
      showInnerStroke: true,
      backgroundStrokeWidth: 0,
      backgroundPadding: 0,
      animation: true,
      animationDuration: 1100,
      space: -4
    })
  ],
  providers: [
    AmplifyService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

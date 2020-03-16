import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule }   from '@angular/forms';
import { HighlightDirective }   from './app.highlightDirective';

import { HttpClientModule } from '@angular/common/http';
import { HomeComponent }    from './app.home';
import { AboutComponent }   from './app.about';
import { PageDefault }      from './app.pagedefault';
import { MovieImages }      from './app.movieImages';

@NgModule({
  declarations: [AppComponent, HomeComponent, AboutComponent, PageDefault, MovieImages, HighlightDirective],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

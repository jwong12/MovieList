import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent }        from './app.home';
import { WatchListComponent }   from './app.watchList';
import { AboutComponent }       from './app.about';
import { PageDefault }          from './app.pagedefault';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'watchlist', component: WatchListComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageDefault }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

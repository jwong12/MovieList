import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent }        from './auth/auth.component';
import { HomeComponent }        from './homeComponent/app.home';
import { WatchListComponent }   from './watchListComponent/app.watchList';
import { ResultsComponent }     from './resultsComponent/app.results';
import { AboutComponent }       from './app.about';
import { PageDefault }          from './app.pagedefault';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'watchlist', component: WatchListComponent },
  { path: 'results/:search', component: ResultsComponent },
  { path: 'about', component: AboutComponent },
  { path: '', component: AuthComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: PageDefault }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent }        from './homeComponent/app.home';
import { WatchListComponent }   from './watchListComponent/app.watchList';
import { ResultsComponent }     from './resultsComponent/app.results';
import { AccountComponent }       from './accountComponent/account.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'watchlist', component: WatchListComponent },
  { path: 'results/:search', component: ResultsComponent },
  { path: 'account', component: AccountComponent },
  { path: '**', redirectTo: 'account', pathMatch: 'full' }
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

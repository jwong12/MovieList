import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent }        from './homeComponent/app.home';
import { WatchListComponent }   from './watchListComponent/app.watchList';
import { AboutComponent }       from './app.about';
import { PageDefault }          from './app.pagedefault';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'watchlist', component: WatchListComponent },
  { path: 'about', component: AboutComponent },
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '**', component: PageDefault }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: false,
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload'
    })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }

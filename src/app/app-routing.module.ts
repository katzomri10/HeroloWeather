import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FavoriteComponent } from './favorite/favorite.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'favorite', component: FavoriteComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

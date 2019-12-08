import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FavoriteComponent } from './favorite/favorite.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from '../app/material-module';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';
import { StorageServiceModule} from 'angular-webstorage-service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FavoriteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    CustomMaterialModule,
    HttpModule,
    ReactiveFormsModule,
    StorageServiceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

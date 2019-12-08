import { Component, OnInit } from '@angular/core';
import { Http, Headers } from '@angular/http';
import {FormControl} from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  countryList:any[]=[];
  countryListInit:any[]=[];
  myControl = new FormControl();
  countryDetails:any;
  favoriteList:any[]=[];
  
  constructor(private http:Http){}

  ngOnInit() {
      this.countryListInit = JSON.parse(localStorage.getItem('countriesList'));
     if (!this.countryListInit){
        this.countryListInit=[];
        this.getCountriesList();
     }
     this.myControl.valueChanges.subscribe(res=>{
           this.getCountries(res);
    });
  }

  getCountries(text){
       this.countryList = JSON.parse(localStorage.getItem('countriesList'));
       this._filter(text);
  }

    _filter(value) {
    const filterValue = value.toLowerCase();
    this.countryList = this.countryListInit.filter(country => country.LocalizedName.toLowerCase().includes(filterValue));
  }

  getCountriesList(){
    for(let char of "abcdefghijklmnopqrstuvwxyz"){
      let headers = new Headers({ 'Content-Type': 'application/json' });
      this.http.get('http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=WzFK7quOIYazAOW0h2bQAGChXmThnOfv&q=' + char).subscribe(res => {
        var countriesChar:any[]=[];
        countriesChar = res.json();
        countriesChar.forEach(element => {
              this.countryListInit.push(element);
        });
        let key = 'countriesList';
        localStorage.setItem(key, JSON.stringify(this.countryListInit));
      },
      err => {
        console.log("Error occured " + err);
      });
    }
  }

  async getWeatherCountry(countryChoise){
      this.countryDetails = {
            currentWeather:undefined,
            foreCasts:undefined,
            details: countryChoise
      }
      var isData:any = JSON.parse(localStorage.getItem(countryChoise.Key));
      if (isData){
        this.countryDetails = isData
        console.log(this.countryDetails);
      }
      else{
        await this.http.get('http://dataservice.accuweather.com/currentconditions/v1/' + countryChoise.Key + '?apikey=WzFK7quOIYazAOW0h2bQAGChXmThnOfv').subscribe(res => {
           this.countryDetails.currentWeather = res.json();
        },
        err => {
          console.log("Error occured " + err);
        });
        await this.http.get('http://dataservice.accuweather.com/forecasts/v1/daily/5day/' + countryChoise.Key + '?apikey=WzFK7quOIYazAOW0h2bQAGChXmThnOfv').subscribe(res2 => {
           this.countryDetails.foreCasts = res2.json();
           console.log(this.countryDetails);
           let key = countryChoise.Key;
           localStorage.setItem(key, JSON.stringify(this.countryDetails));
        },
        err => {
          console.log("Error occured " + err);
        });
      }
  }

  AddFavorite(){
        this.favoriteList =[];
        var isData = JSON.parse(localStorage.getItem("favoriteList"));
        if (isData){
          this.favoriteList = isData;
          console.log(this.favoriteList);
        }
        this.favoriteList.push(this.countryDetails);
        localStorage.setItem('favoriteList', JSON.stringify(this.favoriteList));
  }
  
}

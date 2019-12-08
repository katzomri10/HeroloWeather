import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {
  favoriteList:any[]=[];

  constructor() { }

  ngOnInit() {
         this.getFavoriteList();
  }

  getFavoriteList(){
    var isData = JSON.parse(localStorage.getItem("favoriteList"));
    if (isData){
      this.favoriteList = isData;
      console.log(this.favoriteList);
    }
  }

}

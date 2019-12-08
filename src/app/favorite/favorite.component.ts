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

  deleteFavorite(countryKey){
      for(let i = 0; i < this.favoriteList.length; i++) {
        if (this.favoriteList[i].details.Key === countryKey) {
            this.favoriteList.splice(i, 1);
            break;
        }
      }
      localStorage.setItem("favoriteList", JSON.stringify(this.favoriteList));
  }

}

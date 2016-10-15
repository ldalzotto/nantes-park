/**
 * Created by Loic on 03/10/2016.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {OnInit} from "@angular/core";
import { NantesCoord } from '../../nantes-park.constants';
import {MarkerManager, SebmGoogleMapMarker} from "angular2-google-maps/core";

@Component({
  selector: 'nantes-map',
  templateUrl: './nantes-map.component.html',
  styleUrls: ['./nantes-map.component.css']
})
export class NantesMapComponent implements OnInit{

  private parkList : Array<any>;

  lat: number = NantesCoord[0];
  lng: number = NantesCoord[1];

  public updateMap(parkList: Array<any>){
    console.log("updating map");
    this.parkList = parkList;
    //this.mapToArray(parkListMap).then((result) => this.parkList = result);
  }

  ngOnInit(){
    this.parkList = new Array();
  }

  private mapToArray(myMap : Map<any, any>) :Promise<Array<any>>{
    return new Promise((resolve, reject) => {
      let _parkList;
      myMap.forEach((valeur, cle) => {
        _parkList.push(valeur);
      });
      resolve(_parkList);
    })

  }

}

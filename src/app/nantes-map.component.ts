/**
 * Created by Loic on 03/10/2016.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {OnInit} from "@angular/core";
import { NantesCoord } from './nantes-park.constants';
import {MarkerManager, SebmGoogleMapMarker} from "angular2-google-maps/core";

@Component({
  selector: 'nantes-map',
  templateUrl: './nantes-map.component.html',
  styleUrls: ['./nantes-map.component.css']
})
export class NantesMapComponent {


  lat: number = NantesCoord[0];
  lng: number = NantesCoord[1];
  
  public updateMap(parkList: any){
    console.log("updating map");
    console.log(parkList);
  }

}

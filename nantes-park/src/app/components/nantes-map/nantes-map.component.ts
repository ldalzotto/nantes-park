/**
 * Created by Loic on 03/10/2016.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {OnInit} from "@angular/core";
import { NantesCoord } from '../../nantes-park.constants';
import {ParkService} from "../../services/park.service";
import {MarkerManager, SebmGoogleMapMarker} from "angular2-google-maps/core";

@Component({
  selector: 'nantes-map',
  templateUrl: './nantes-map.component.html',
  styleUrls: ['./nantes-map.component.css'],
  providers: [ParkService]
})
export class NantesMapComponent implements OnInit{

  lat: number = NantesCoord[0];
  lng: number = NantesCoord[1];

  constructor(private parkService: ParkService) {
  }

  private parkList : Array<any>;

  public updateMap(parkList: Array<any>){
    console.log("updating map");
    this.parkList = parkList;
    //this.mapToArray(parkListMap).then((result) => this.parkList = result);
  }

  ngOnInit(){
    this.parkList = [];
  }

  public markerClicked(id: number){

  }

}

/**
 * Created by Loic on 03/10/2016.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {OnInit} from "@angular/core";
import { NantesCoord } from '../../nantes-park.constants';
import {ParkService} from "../../services/park.service";
import {MarkerManager, SebmGoogleMapMarker, GoogleMapsAPIWrapper} from "angular2-google-maps/core";
import {ParkingsData, ParkingData} from "../../business/parking";
import {GenericOpenData, ParkingGroup} from "../../business/opendata/opendata";

@Component({
  selector: 'nantes-map',
  templateUrl: './nantes-map.component.html',
  styleUrls: ['./nantes-map.component.css'],
  providers: [ParkService]
})
export class NantesMapComponent implements OnInit{

  lat: number = NantesCoord[0];
  lng: number = NantesCoord[1];

  clientLat: number;
  clientLong: number;

  parkingMarkerIcon : string = 'app/constants/parking-marker-icon.png';

  constructor(private parkService: ParkService,
    private _wrapper: GoogleMapsAPIWrapper) {
  }

  private parkList : Array<ParkingData>;

  //TODO map id/places pour l'affichage des places disponibles

  public updateMap(parkList: ParkingsData){
    console.log("updating map");
    this.parkList = parkList.parkDataList;
    //this.mapToArray(parkListMap).then((result) => this.parkList = result);
  }

  ngOnInit(){
    this.parkList = [];
    navigator.geolocation.getCurrentPosition((position: Position) => {
      this.clientLat = position.coords.latitude;
      this.clientLong = position.coords.longitude;
    })
  }

  public markerClicked(id: number){
      this.parkService.getListOfParkFromCityWithCache("").subscribe((result: GenericOpenData) => {
        console.log("Marker clicked :");
        result.opendata.answer.data.Groupes_Parking.Groupe_Parking.forEach((parkingGroup:ParkingGroup) => {
            if(parkingGroup.IdObj === id) {
                this.parkList.forEach((parking:ParkingData) => {
                  if(id === parking.id) {
                    parking.nbPlaceActuel = parkingGroup.Grp_disponible;
                    parking.nbPlaceForComplet = parkingGroup.Grp_complet;
                    parking.nbPlaceTotal = parkingGroup.Grp_exploitation;
                  }
                })
            }
        })
      })
  }

  public changeServiceMockedStatus(value: boolean){
    this.parkService.updateGenericOpenDataMockedStatus(value);
  }

  public isClientPositionKnown(): boolean {
    if(this.clientLong && this.clientLat){
      return true;
    } else {
      return false;
    }
  }

}

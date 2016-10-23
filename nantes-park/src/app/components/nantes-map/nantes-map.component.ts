/**
 * Created by Loic on 03/10/2016.
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
import {OnInit} from "@angular/core";
import { NantesCoord } from '../../nantes-park.constants';
import {ParkService} from "../../services/park.service";
import {MarkerManager, SebmGoogleMapMarker, GoogleMapsAPIWrapper} from "angular2-google-maps/core";
import {ParkingsData, ParkingData, ParkSpaceData, SpaceStatus} from "../../business/parking";
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

  parkingMarkerIconBlue : string = 'app/constants/parking-marker-icon.png';
  parkingMarkerIconRed : string = 'app/constants/parking-marker-icon-red.png';
  parkingMarkerIconGreen : string = 'app/constants/parking-marker-icon-green.png';

  constructor(private parkService: ParkService,
    private _markerManager: MarkerManager) {
  }

  private parkList : Array<ParkingData>;

  //TODO map id/places pour l'affichage des places disponibles

  public updateMap(parkList: ParkingsData){
    console.log("updating map");
    let _parkList: Array<ParkingData>;
    _parkList = parkList.parkDataList;
    _parkList.forEach((parkingData:ParkingData) => {
      this.markerClicked(parkingData);
    });
    this.parkList = _parkList;
    //this.mapToArray(parkListMap).then((result) => this.parkList = result);
  }

  ngOnInit(){
    navigator.geolocation.getCurrentPosition((position: Position) => {
      this.clientLat = position.coords.latitude;
      this.clientLong = position.coords.longitude;
    });
  }

  public markerClicked(park: ParkingData){
    var id = park.id;
      this.parkService.getListOfParkFromCityWithCache("").subscribe((result: GenericOpenData) => {
        console.log("Marker clicked :");
        this.parkService.getParkSpaceStatusFromGenericOpenData(result, id).subscribe((result: ParkSpaceData) => {
            park.parkSpaceData = result;
        });
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

  selectRightIconColor(status: SpaceStatus): string{
      if(status === SpaceStatus.GOOD){
        return this.parkingMarkerIconGreen;
      } else if (status === SpaceStatus.BAD) {
        return this.parkingMarkerIconRed;
      } else if (status === SpaceStatus.AVERAGE) {
        return this.parkingMarkerIconBlue;
      }
  }

}

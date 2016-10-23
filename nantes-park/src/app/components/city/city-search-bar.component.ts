/**
 * Created by Loic on 05/10/2016.
 */

import {Component} from "@angular/core/src/metadata/directives";
import {OnInit} from "@angular/core";
import {CITIES} from "../../constants/Cities";
import {ParkService} from "../../services/park.service";
import {GenericOpenData} from "../../business/opendata/opendata"

import {EventEmitter, Input, Output } from '@angular/core';
import {ParkingsData, ParkingData, ParkSpaceData} from "../../business/parking";

@Component({
  selector: 'city-search-bar',
  templateUrl: './city-search-bar.component.html',
  styleUrls: ['./city-search-bar.component.css'],
  providers: [ParkService],
})
export class CitySearchBarComponent implements OnInit {

  /**
   * Emit an array representing the current list of city
   * @type {EventEmitter}
   */
  @Output() onMapUpdate = new EventEmitter();

  private cities: string[];
  private selectedCity : string = 'default';

  private receivedData: GenericOpenData;

  private errorMessage: string;

  constructor(private parkService: ParkService) {
  }

  ngOnInit(): void {
    this.cities = CITIES;
    console.log(this.cities);
    this.ngOnCitySelected();
  }

  ngOnCitySelected(): void{
    this.parkService.getListOfParkFromCityWithCache(this.selectedCity)
      .subscribe(result => {
        this.receivedData = result;
        this.parkService.getParksFromGenericOpenData(this.receivedData).subscribe((result:ParkingsData) => {
          result.parkDataList.forEach((parkingData:ParkingData) => {
            this.parkService.getParkSpaceStatusFromGenericOpenData(this.receivedData, parkingData.id).subscribe((result:ParkSpaceData) => {
              parkingData.parkSpaceData = result;
            })
          });
          this.onMapUpdate.emit(result);
        });
      }, error => {this.errorMessage=error;})
  }

}

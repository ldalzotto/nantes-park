/**
 * Created by Loic on 05/10/2016.
 */

import {Component} from "@angular/core/src/metadata/directives";
import {OnInit} from "@angular/core";
import {CITIES} from "../../constants/Cities";
import {ParkService} from "../../services/park.service";
import {GenericOpenData} from "../../business/opendata/opendata"

import {Parking} from "../../business/parking"
import {EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'city-search-bar',
  templateUrl: './city-search-bar.component.html',
  styleUrls: ['./city-search-bar.component.css'],
  providers: [ParkService],
})
export class CitySearchBarComponent implements OnInit {

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
    this.parkService.getListOfParkFromCity(this.selectedCity)
      .subscribe(result => {
        this.receivedData = result;
        console.log(result);
        this.parkService.getParksFromGenericOpenData(this.receivedData).subscribe(result => {
          console.log(result);
          this.onMapUpdate.emit(result);
        })
      }, error => {this.errorMessage=error;})
  }

}

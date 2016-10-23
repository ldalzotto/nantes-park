import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { NantesMapComponent } from './components/nantes-map/nantes-map.component';
import {CommonModule} from "@angular/common";
import {AgmCoreModule, MarkerManager, GoogleMapsAPIWrapper} from "angular2-google-maps/core";
import {CitySearchBarComponent} from "./components/city/city-search-bar.component";
import {ParkService} from "./services/park.service";
import {DebugBoxComponent} from "./components/debug-box/debug-box.component";
import {NantesMapInfoWindow} from "./components/info-window/nantes-map-google-map-info-window";

@NgModule({
  declarations: [
    AppComponent, NantesMapComponent, CitySearchBarComponent, DebugBoxComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAXAXpPRLcq2Vnd0DvPcNTPM03RUN8sSFA'
    })
  ],
  providers: [ParkService, MarkerManager, GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }

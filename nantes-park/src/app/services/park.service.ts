/**
 * Created by Loic on 05/10/2016.
 */
import {Injectable, EventEmitter} from "@angular/core";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map'
import {Http, Response, Headers, RequestOptions } from "@angular/http";
import {GenericOpenData} from "../business/opendata/opendata";
import {ParkingsData, ParkSpaceData} from "../business/parking";

@Injectable()
export class ParkService {

  parkNantesUrl : string = 'http://data.nantes.fr/api/getDisponibiliteParkingsPublics/1.0/39W9VSNCSASEOGV/?output=json';
  parkingApiUrl : string = 'http://localhost:8080/api/park-from-raw-data';
  mockedOpenDataUrl : string = 'app/constants/mockedOpenData.json';

  genericOpenData : any;

  private isGenericOpenDataCached : boolean = false;
  private isGenericOpenDataMocked : boolean;

  getListOfParkFromCityWithCache(city:string): Observable<GenericOpenData> {
    if(this.isGenericOpenDataMocked) {
      console.log("Get data from opendata mock");
      return this.http.get(this.mockedOpenDataUrl)
        .map((data) => this.extractData(data))
        .catch(this.handleError)
    } else {
      if (this.isGenericOpenDataCached) {
        console.log("Get data from opendata cache");
        return Observable.of(this.genericOpenData);
      } else {
        return this.http.get(this.parkNantesUrl)
          .map((data) => this.extractData(data))
          .catch(this.handleError)
          .finally(() => this.manageGenericOpenDataCache());
      }

    }

  }

  constructor(private http: Http){
    this.isGenericOpenDataMocked = false;
  };

  /**
   * Opendata cache cleared every 5 minutes
   */
  manageGenericOpenDataCache(){
      this.isGenericOpenDataCached = true;
      setTimeout(() => this.clearGenericOpenDataCache(), 300000);
  }

  private clearGenericOpenDataCache(){
    console.log('Clearing opendata CACHE');
    this.genericOpenData = null;
    this.isGenericOpenDataCached = false;
  }

  private extractData(res: Response) {
    console.log("Extracting data from open nantes data...");
    let body = [];
    body = JSON.parse(res.text());
    console.log("return body :");
    console.log(body);
    this.genericOpenData = body;
    return body;
  }

  private handleError(error : any) {
      console.log(error.message);
    return Observable.throw(error);
  }

  getParksFromGenericOpenData(genericOpenData: GenericOpenData): Observable<ParkingsData> {
    console.log("getting park from generic data : ");
    console.log(genericOpenData);
    return this.http.post(this.parkingApiUrl, genericOpenData.opendata.answer.data.Groupes_Parking.Groupe_Parking)
          .map(this.extractData)
          .catch(this.handleError)
  }

  updateGenericOpenDataMockedStatus(value: boolean):void {
    if(value){
      this.isGenericOpenDataMocked = true;
    } else {
      this.isGenericOpenDataMocked = false;
    }
    console.log(this.isGenericOpenDataMocked);
  }

  /*
  getParkSpaceInfo(genericOpenData: GenericOpenData): Observable<ParkSpaceData> {
    console.log("getting parkspace from generic data :");
  }*/



}

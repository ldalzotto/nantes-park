/**
 * Created by Loic on 05/10/2016.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map'
import {Http, Response, Headers, RequestOptions } from "@angular/http";
import {GenericOpenData} from "../business/opendata/opendata";
import {ParkingsData, ParkSpaceData} from "../business/parking";
import {from} from "rxjs/observable/from";
import {mergeNsAndName} from "@angular/compiler/src/ml_parser/tags";

@Injectable()
export class ParkService {

  parkNantesUrl : string = 'http://data.nantes.fr/api/getDisponibiliteParkingsPublics/1.0/39W9VSNCSASEOGV/?output=json';
  parkingApiUrl : string = 'http://localhost:8080/api/park-from-raw-data';

  genericOpenData : any;

  private isGenericOpenDataCached : boolean = false;

  getListOfParkFromCityWithCache(city:string): Observable<GenericOpenData> {
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

  constructor(private http: Http){};

  /**
   * Opendata cache cleared every 10 secends
   */
  manageGenericOpenDataCache(){
      this.isGenericOpenDataCached = true;
      setTimeout(() => this.clearGenericOpenDataCache(), 10000);
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

  //getParkSpaceInfo(genericOpenData: GenericOpenData): Observable<ParkSpaceData> {
    //console.log("getting parkspace from generic data :");
  //}



}

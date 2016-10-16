/**
 * Created by Loic on 05/10/2016.
 */
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import 'rxjs/add/operator/map'
import {Http, Response, Headers, RequestOptions } from "@angular/http";
import {GenericOpenData} from "../business/opendata/opendata";
import {ParkingsData} from "../business/parking";

@Injectable()
export class ParkService {

  parkNantesUrl : string = 'http://data.nantes.fr/api/getDisponibiliteParkingsPublics/1.0/39W9VSNCSASEOGV/?output=json';
  parkingApiUrl : string = 'http://localhost:8080/api/park-from-raw-data';

  constructor(private http: Http){};

  getListOfParkFromCity(city:string): Observable<GenericOpenData> {
    return this.http.get(this.parkNantesUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    console.log("Extrancting data from open nantes data...");
    let body = [];
    body = JSON.parse(res.text());
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

  getParkInfoDataFromId(){

  }

}

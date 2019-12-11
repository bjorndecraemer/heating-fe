import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendHttpService {

  private baseUrl = 'http://192.168.1.30:8080/api/fecontrol/';
  // private baseUrl: string = "http://localhost:8080/api/fecontrol/"
  private pumpEndpoint = 'pump';
  private burnerEndpoint = 'burner';
  private heatingEndpoint = 'heating';
  private humidityEndpoint = 'humidity';
  private tempEndpoint = 'temp';

  constructor(private http: HttpClient) { }

  public activateBurner(): Observable<Object> {
    return this.http.put(this.baseUrl + this.burnerEndpoint + '?setting=true', '');
  }

  public deactivateBurner(): Observable<Object> {
    return this.http.put(this.baseUrl + this.burnerEndpoint + '?setting=false', '');
  }

  public activateHeating(): Observable<Object> {
    return this.http.put(this.baseUrl + this.heatingEndpoint + '?setting=true', '');
  }

  public deactivateHeating(): Observable<Object> {
    return this.http.put(this.baseUrl + this.heatingEndpoint + '?setting=false', '');
  }

  public activatePump(): Observable<Object> {
    return this.http.put(this.baseUrl + this.pumpEndpoint + '?setting=true', '');
  }

  public deactivatePump(): Observable<Object> {
    return this.http.put(this.baseUrl + this.pumpEndpoint + '?setting=false', '');
  }

  public getPumpStatus(): Observable<Object> {
    return this.http.get(this.baseUrl + this.pumpEndpoint);
  }
  public getBurnerStatus(): Observable<Object> {
    return this.http.get(this.baseUrl + this.burnerEndpoint);
  }

  public getTemperature(): Observable<Object> {
    return this.http.get(this.baseUrl + this.tempEndpoint);
  }

  public getHumidity(): Observable<Object> {
    return this.http.get(this.baseUrl + this.humidityEndpoint);
  }
}

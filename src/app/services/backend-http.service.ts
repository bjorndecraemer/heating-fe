import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendHttpService {
    private baseUrl = 'http://192.168.1.30:8080/api/fecontrol/';
  // private baseUrl = 'http://localhost:8080/api/fecontrol/';
  private pumpEndpoint = 'pump';
  private burnerEndpoint = 'burner';
  private heatingEndpoint = 'heating';
  private humidityEndpoint = 'humidity';
  private tempEndpoint = 'temp';
  private manualEndPoint = 'manual';

  constructor(private http: HttpClient) { }

  public activateBurner(): Observable<object> {
    return this.http.put(this.baseUrl + this.burnerEndpoint + '?setting=true', '');
  }

  public deactivateBurner(): Observable<object> {
    return this.http.put(this.baseUrl + this.burnerEndpoint + '?setting=false', '');
  }

  public activateHeating(): Observable<object> {
    return this.http.put(this.baseUrl + this.heatingEndpoint + '?setting=true', '');
  }

  public deactivateHeating(): Observable<object> {
    return this.http.put(this.baseUrl + this.heatingEndpoint + '?setting=false', '');
  }

  public activatePump(): Observable<object> {
    return this.http.put(this.baseUrl + this.pumpEndpoint + '?setting=true', '');
  }

  public deactivatePump(): Observable<object> {
    return this.http.put(this.baseUrl + this.pumpEndpoint + '?setting=false', '');
  }
  public deactivateManual(): Observable<object> {
    return this.http.put(this.baseUrl + this.manualEndPoint + '?setting=false', '');
  }

    public activateManual(): Observable<object> {
        return this.http.put(this.baseUrl + this.manualEndPoint + '?setting=true', '');
    }

  public getPumpStatus(): Observable<object> {
    return this.http.get(this.baseUrl + this.pumpEndpoint);
  }
  public getBurnerStatus(): Observable<object> {
    return this.http.get(this.baseUrl + this.burnerEndpoint);
  }

  public getTemperature(): Observable<object> {
    return this.http.get(this.baseUrl + this.tempEndpoint);
  }

  public getHumidity(): Observable<object> {
    return this.http.get(this.baseUrl + this.humidityEndpoint);
  }

  public getManualStatus(): Observable<object> {
      return this.http.get(this.baseUrl + this.manualEndPoint);
  }
}

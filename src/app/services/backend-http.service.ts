import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackendHttpService {

  private baseUrl: string = "http://192.168.1.30:8080/api/fecontrol/";
  private pumpEndpoint: string = "pump";
  private burnerEndpoint: string = "burner";
  private heatingEndpoint: string = "heating";

  constructor(private http: HttpClient) { }

  public activateBurner() : Observable<Object>{
    return this.http.put(this.baseUrl+this.burnerEndpoint+"?setting=true","")
  }

  public deactivateBurner() : Observable<Object>{
    return this.http.put(this.baseUrl+this.burnerEndpoint+"?setting=false","")
  }

  public activateHeating() : Observable<Object>{
    return this.http.put(this.baseUrl+this.heatingEndpoint+"?setting=true","")
  }

  public deactivateHeating() : Observable<Object>{
    return this.http.put(this.baseUrl+this.heatingEndpoint+"?setting=false","")
  }

  public activatePump() : Observable<Object>{
    return this.http.put(this.baseUrl+this.pumpEndpoint+"?setting=true","")
  }

  public deactivatePump() : Observable<Object>{
    return this.http.put(this.baseUrl+this.pumpEndpoint+"?setting=false","")
  }

  public getPumpStatus() : Observable<Object>{
    return this.http.get(this.baseUrl+this.pumpEndpoint);
  }
  public getBurnerStatus() : Observable<Object>{
    return this.http.get(this.baseUrl+this.burnerEndpoint);
  }
}

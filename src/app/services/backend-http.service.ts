import {Injectable} from '@angular/core';
import {HeatingService} from "./heating.service";

@Injectable({
  providedIn: 'root'
})
export class BackendHttpService {

  private heaterSubject;
  private pumpSubject;

  constructor(private heatingService : HeatingService) { }

  public activateBurner(){
    this.heatingService
  }
}

import {Injectable} from '@angular/core';
import {BackendHttpService} from './backend-http.service';
import {Observable, Subject} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {PumpIntervalValues} from './PumpIntervalValues';


@Injectable({
  providedIn: 'root'
})
export class HeatingService {

  public burnerSubject: Subject<boolean> = new Subject();
  public pumpSubject: Subject<boolean> = new Subject();
  public loadingSubject: Subject<boolean> = new Subject();
  public currentPumpIntervalSubject: Subject<PumpIntervalValues> = new Subject();

  constructor(private backendHttpService: BackendHttpService) {
    this.loadingSubject.next(false);
    this.getPumpStatus();
    this.getBurnerStatus();

  }

  public activateBurner() {
    this.backendHttpService.activateBurner()
        .subscribe(() =>
            this.burnerSubject.next(true)
        );
  }

  public deactivateBurner() {
    this.backendHttpService.deactivateBurner().subscribe(() => this.burnerSubject.next(false));
  }

  public activatePump() {
    this.backendHttpService.activatePump().subscribe(() => this.pumpSubject.next(true));
  }

  public deactivatePump() {
    this.backendHttpService.deactivatePump().subscribe(() => this.pumpSubject.next(false));
  }

  public triggerStatusUpdate(){
    this.loadingSubject.next(true);
    this.getPumpStatus().pipe(flatMap(() => this.getBurnerStatus())).subscribe(()=> this.loadingSubject.next(false));
    this.currentPumpIntervalSubject.next(60);
  }

  private getPumpStatus() : Observable<void>{
    return this.backendHttpService.getPumpStatus().pipe(map((res: boolean) => this.pumpSubject.next(res)));
  }

  private getBurnerStatus() : Observable<void>{
    return this.backendHttpService.getBurnerStatus().pipe(map((res: boolean) => this.burnerSubject.next(res)));
  }

  public onPumpIntervalChanged(event: Event){
    console.log('Changed : ' + event.detail.value);
    this.currentPumpIntervalSubject.next(new PumpIntervalValues(event.detail.value));
  }
}

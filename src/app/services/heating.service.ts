import {Injectable} from '@angular/core';
import {BackendHttpService} from './backend-http.service';
import {Observable, Subject} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeatingService {

  public burnerSubject: Subject<Boolean> = new Subject();
  public pumpSubject: Subject<Boolean> = new Subject();
  public loadingSubject: Subject<Boolean> = new Subject();
  public tempSubject: Subject<string> = new Subject<string>();
  public humiditySubject: Subject<string> = new Subject<string>();

  constructor(private backendHttpService: BackendHttpService) {
    this.loadingSubject.next(false);
    this.getPumpStatus();
    this.getBurnerStatus();
    this.getTempStatus();
    this.getHumidityStatus();
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

  public triggerStatusUpdate() {
    this.loadingSubject.next(true);
    this.getPumpStatus().pipe(
        flatMap(() => this.getBurnerStatus()),
        flatMap(() => this.getTempStatus()),
        flatMap(() => this.getHumidityStatus())
    )
        .subscribe(() => this.loadingSubject.next(false));
    // forkJoin(this.getPumpStatus(), this.getBurnerStatus, () => {}).subscribe(()=> this.loadingSubject.next(false));
  }

  private getPumpStatus(): Observable<void> {
    return this.backendHttpService.getPumpStatus().pipe(map((res: boolean) => this.pumpSubject.next(res)));
  }

  private getBurnerStatus(): Observable<void> {
    return this.backendHttpService.getBurnerStatus().pipe(map((res: boolean) => this.burnerSubject.next(res)));
  }

  private getTempStatus(): Observable<void> {
    return this.backendHttpService.getTemperature().pipe(map((res: string) => this.tempSubject.next(res)));
  }

  private getHumidityStatus(): Observable<void> {
    return this.backendHttpService.getHumidity().pipe(map((res: string) => this.humiditySubject.next(res)));
  }
}

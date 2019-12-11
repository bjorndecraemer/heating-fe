import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeatingService} from '../services/heating.service';
import {interval} from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy{
  private $secondsCounterObservable;
  private burnerActive = false;

  constructor(private heatingService : HeatingService) {}

  public ngOnInit(){
    this.heatingService.triggerStatusUpdate();
    this.$secondsCounterObservable = interval(10000).subscribe(()=> {this.heatingService.triggerStatusUpdate()})
  }

  public ngOnDestroy(): void {
    this.$secondsCounterObservable.unsubscribe();
  }

  public onBurnerDeactivate(){
    this.heatingService.deactivateBurner();
  }

  public onBurnerActivate(){
    this.heatingService.activateBurner();
  }

  public onPumpDeactivate(){
    this.heatingService.deactivatePump();
  }

  public onPumpActivate(){
    this.heatingService.activatePump();
  }

  public onBurnerSwitch(event : CustomEvent){
    console.log(event);
    let isChecked = event.detail.checked;
    console.log("checked = "+isChecked);
  }

}

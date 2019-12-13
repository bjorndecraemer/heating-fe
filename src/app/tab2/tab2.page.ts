import {Component, OnDestroy, OnInit} from '@angular/core';
import {HeatingService} from '../services/heating.service';
import {interval} from 'rxjs';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {
  private $secondsCounterObservable;
  private burnerActive = false;
  private knobValues = 0;
  private knobLabel = 'Off';
  private sliderBadgeColor = 'danger';

  constructor(private heatingService: HeatingService) {}

  public ngOnInit() {
    this.heatingService.triggerStatusUpdate();
    this.$secondsCounterObservable = interval(5000).subscribe(() => {this.heatingService.triggerStatusUpdate(); });
  }

  public ngOnDestroy(): void {
    this.$secondsCounterObservable.unsubscribe();
  }

  public onBurnerDeactivate() {
    this.heatingService.deactivateBurner();
  }

  public onBurnerActivate() {
    this.heatingService.activateBurner();
  }

  public onPumpDeactivate() {
    this.heatingService.deactivatePump();
  }

  public onPumpActivate() {
    this.heatingService.activatePump();
  }

  public onManualDisable() {
      this.heatingService.deactivateManual();
  }

public onManualEnable() {
        this.heatingService.activateManual();
    }

  public onBurnerSwitch(event: CustomEvent) {
    console.log(event);
    const isChecked = event.detail.checked;
    console.log('checked = ' + isChecked);
  }

    public onSliderChanged() {
        console.log('Current debounced value = ' + this.knobValues);
        if (this.knobValues === 0) {
            this.sliderBadgeColor = 'medium';
            this.knobLabel = 'off';
        } else {
            this.sliderBadgeColor = 'danger';
            this.knobLabel = `${this.knobValues}`;
        }
    }
}

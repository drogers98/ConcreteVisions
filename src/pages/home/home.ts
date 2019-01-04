import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationService } from '../../providers/locationService';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    public locationService: LocationService,
  ) {}

  
  ngOnInit() {

  }

  locationChange(val) {
    this.locationService.setLocation(val);
  }

}

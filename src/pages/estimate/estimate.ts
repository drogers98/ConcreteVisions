import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationService } from '../../providers/locationService';
import { ModalController } from 'ionic-angular';

@Component({
  selector: 'page-estimate',
  templateUrl: 'estimate.html'
})
export class EstimatePage {

  public location: string;
  public est = {
      floor: '',
      other: '',
      tod: '',
      address: '',
      city: '',
      zip: '',
  };

  constructor(
    public navCtrl: NavController,
    public locationService: LocationService,
    public modalCtrl: ModalController
  ) {
    this.est.tod = 'rh';
  }

  ngOnInit() {
    this.location = this.locationService.locationChosen;
  }

  public openModal(estimate, min_met, min_scans){ 
    var data = { 
      price : estimate,
      minimum_met: min_met,
      minimum_scans: min_scans
    };
    var modalPage = this.modalCtrl.create('ModalPage', data);
    modalPage.present();
  }

  getEstimate() {
    this.location = this.locationService.locationChosen;
    console.log(this.est);
    let cost = 0;
    var min_met = true;
    var min_scans = 4;
    
    // Switch hourly rate for MD/GA
    let scan_floor_hourly = 150;
    let scan_other_hourly = 175;
    if(this.location == 'ga') {
      scan_floor_hourly = 200;
      scan_other_hourly = 225;
    }

    // Get scan number and types
    let scan_floor_number = parseInt(this.est.floor) || 0;
    let scan_other_number = parseInt(this.est.other) || 0;
    let scan_total = (scan_floor_number + scan_other_number);
    cost += ((scan_floor_number * scan_floor_hourly) + (scan_other_number * scan_other_hourly));

    // Check they make minumum cost
    if(cost < 600) {
      cost = 600;
      min_met = false;
      if(this.location == 'ga') {
        min_scans = 3;
      }
    }
    
    // Time of Day adjustments
    let tod = this.est.tod;
    let tod_multi = 0;
    if(tod == 'oh') {
      tod_multi = 0.30;
    } else if(tod == 'sh') {
      tod_multi = 0.60;
    }
    cost += (cost * tod_multi);
    // Round to whole number for ease
    cost = Math.round(cost);

    if(this.location !== 'ga') {
      // Add $50 report fee for every 8 scans
      let scan_total_mult = (Math.ceil(scan_total / 8));
      let scan_total_cost = (scan_total_mult * 50);
      cost += scan_total_cost;
    }

    // Convert to string
    var cost_str = cost.toLocaleString();
    var ttl_cost = '$' + cost_str + '.00';
    // Open modal
    this.openModal(ttl_cost, min_met, min_scans);

  }

}

import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
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
    public modalCtrl: ModalController
  ) {
    this.est.tod = 'rh';
  }

  ngOnInit() {}

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
    this.location = 'temp_remove';
    let cost = 0;
    var min_met = true;
    var min_scans = 4;

    // Switch hourly rate for MD/GA
    let scan_floor_hourly = 150;
    let scan_other_hourly = 175;

    // Get scan number and types
    let scan_floor_number = parseInt(this.est.floor) || 0;
    let scan_other_number = parseInt(this.est.other) || 0;
    let scan_total = (scan_floor_number + scan_other_number);
    cost += ((scan_floor_number * scan_floor_hourly) + (scan_other_number * scan_other_hourly));

    // Check they make minimum cost
    if(cost < 600) {
      cost = 600;
      min_met = false;
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

    // Add $50 report fee for every 8 scans
    let scan_total_mult = (Math.ceil(scan_total / 8));
    let scan_total_cost = (scan_total_mult * 50);
    cost += scan_total_cost;

    // Convert to string
    var cost_str = cost.toLocaleString();
    var ttl_cost = '$' + cost_str + '.00';
    // Open modal
    this.openModal(ttl_cost, min_met, min_scans);

  }

}

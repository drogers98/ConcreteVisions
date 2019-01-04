import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})

export class ModalPage {

  price = String;
  min_met = Boolean;
  min_scans = String;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public viewCtrl : ViewController) {
  }

  ionViewDidLoad() {
    this.price = this.navParams.get('price');
    this.min_met = this.navParams.get('minimum_met');
    this.min_scans = this.navParams.get('minimum_scans');
    console.log(this.price);
  }

  public closeModal(){
    this.viewCtrl.dismiss();
  }

}
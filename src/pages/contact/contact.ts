import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
import { EmailComposer } from '@ionic-native/email-composer';
import { LocationService } from '../../providers/locationService';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(
    public navCtrl: NavController,
    private callNumber: CallNumber,
    private emailComposer: EmailComposer,
    public locationService: LocationService
  ) {

    

  }

  ngOnInit() {
    
  }

  callUs(telephoneNumber) {
    this.callNumber.callNumber(telephoneNumber, true);
  }

  emailUs(toAddr, cc1Addr, cc2Addr) {

    let emailInfo = {
      to: toAddr,
      cc: [cc1Addr, cc2Addr],
      subject: 'Concrete Visions Inquiry',
      body: 'I am interested in more information about concrete scanning:',
      isHtml: false
    };

    this.emailComposer.open(emailInfo);
  }

  textUs() {

  }



}

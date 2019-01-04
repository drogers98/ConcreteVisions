import {Injectable} from '@angular/core';
import { Storage } from '@ionic/storage';


@Injectable()
export class LocationService {
    
    locationChosen: any;

    constructor(
        public storage: Storage,
    ) {
        this.locationChosen = this.getLocation();
    }

    setLocation(val) {
        this.locationChosen = val;
        this.storage.set('userLocation', this.locationChosen);
    }

    getLocation() {
        this.storage.get('userLocation')
            .then(val => {
            //this.locationChosen = 'loading';
            if(val) {
                this.locationChosen = val;
            }
            return val;
        });
    }
    


}
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation'; 

declare var google;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  Start:any;
  End:any;
  typeMode : any;
  constructor(public navCtrl: NavController, private geolocation : Geolocation) {

  }
 

  
  calculateAndDisplayRoute() {
      var directionsService = new google.maps.DirectionsService;
      var directionsDisplay = new google.maps.DirectionsRenderer;

      this.geolocation.getCurrentPosition().then(( position ) => {
        let location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        console.log(location)
      });
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 2,
        center: {lat: 41.85, lng: -87.65}//location
      });
      directionsDisplay.setMap(map);
      var selectedMode = this.typeMode;
      console.log(selectedMode);
      directionsService.route({
        origin: this.Start,
        destination: this.End,
        travelMode: google.maps.TravelMode[selectedMode]
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });


      var service = new google.maps.DistanceMatrixService();
      console.log(service);
      console.log('service is->');
  }
}

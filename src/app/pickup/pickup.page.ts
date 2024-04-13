import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-pickup',
  templateUrl: './pickup.page.html',
  styleUrls: ['./pickup.page.scss'],
})
export class PickupPage {

  customerName: string = '';
  phoneNumber: string = '';
  address: string = '';
  items: string = '';

  constructor(private navCtrl: NavController) { }

  submitOrder() {
    // Here you can implement the logic to submit the order, e.g., send data to server
    console.log('Submitted Order:', {
      customerName: this.customerName,
      phoneNumber: this.phoneNumber,
      address: this.address,
      items: this.items
    });

    // For demo purpose, navigate back to home after submission
    this.navCtrl.navigateBack('/inventory');
  }

}

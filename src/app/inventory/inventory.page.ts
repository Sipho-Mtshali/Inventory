import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.page.html',
  styleUrls: ['./inventory.page.scss'],
})
export class InventoryPage implements OnInit {

  constructor(private router: Router,
    private nav: NavController,

  ) { }

  ngOnInit() {
  }
  captureInventory() {
    
    this.router.navigate(['/add-inventory']);
  }
  storeInventory() {
    this.router.navigateByUrl('/store-inventory');
  }

  updateInventory() {
    this.router.navigateByUrl('/update-inventory');
  }

  delivery() {
    this.router.navigateByUrl('/take-pictures');
  }

  viewRemainingInventory() {
    this.router.navigateByUrl('/view-inventory');
  }

  viewAnalytics() {
    this.router.navigateByUrl('/analytics');
  }
}


  

  
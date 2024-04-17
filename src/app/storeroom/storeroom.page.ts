import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-storeroom',
  templateUrl: './storeroom.page.html',
  styleUrls: ['./storeroom.page.scss'],
})
export class StoreroomPage implements OnInit {

  inventory: any[] = []; // Initialize here
  filteredInventory: any[] = [];
  searchTerm: string = '';
  isModalOpen = false;
  selectedImageUrl = '';
  modalTitle = '';

  constructor(private firestore: AngularFirestore, private router: Router) { }

  ngOnInit() {
    this.getInventory();
  }

  openModal(imageUrl: string, itemName: string) {
    this.selectedImageUrl = imageUrl;
    this.modalTitle = itemName;
    this.isModalOpen = true;
  }

  getInventory() {
    this.firestore
    .collection('inventory', ref => ref.orderBy('timestamp', 'desc'))
    .valueChanges()
    .subscribe((data: any[]) => {
      this.inventory = data;
      this.filterInventory();
    });
  }

  filterInventory() {
    this.filteredInventory = this.inventory.filter((item) =>
      (item.barcode.toString().includes(this.searchTerm) || this.searchTerm === ''));
  }
  goToUpdate(
    name: any,
    category: any,
    description: any,
    quantity: any,
    barcode: any,
    pickersDetails: any,
    dateOfPickup: any,
    timeOfPickup: any,
    imageUrl: any
  ) {
    let navi: NavigationExtras = {
      state: {
        name: name,
        category: category,
        description: description,
        imageUrl: imageUrl || '',
        quantity: quantity,
        pickersDetails: pickersDetails,
        dateOfPickup: dateOfPickup,
        timeOfPickup: timeOfPickup,
        barcode: barcode || '',
      },
    };
    this.router.navigate(['/update-inventory'], navi);
  }
  
}

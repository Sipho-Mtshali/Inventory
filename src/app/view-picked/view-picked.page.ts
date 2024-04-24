import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastController } from '@ionic/angular';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

interface OrderItem {
  name: string;
  barcode: number;
  pickersDetails: string;
  description: string;
  itemName: string;
  dateOfPickup: string;
  timeOfPickup: string;
  quantity: number;
  selectedItems: OrderItem[];
}

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-view-picked',
  templateUrl: './view-picked.page.html',
  styleUrls: ['./view-picked.page.scss'],
})
export class ViewPickedPage implements OnInit {
  orders: OrderItem[] = [];
  data: any;
  capturedPhotos: any[] = [];
  segmentValue: string = 'view';
  products: any[] = [];
  expandedItem: any = null;
  selectedQuantity: number = 1;
  selectedSize: string = '';
  sizeOptions: string[] = [];
  quantityOptions: number[] = [];

  constructor(
    private firestore: AngularFirestore,
    private toastCtrl: ToastController,
  ) {}

  async ngOnInit() {
    await this.fetchInventoriesFromFirestore();
    this.firestore.collection('inventory').valueChanges().subscribe((products) => {
      this.products = products;
      console.log(products);
    });
  }

  async fetchInventoriesFromFirestore() {
    try {
      const ordersSnapshot = await this.firestore.collection('inventory').get().toPromise() as firebase.firestore.QuerySnapshot<OrderItem>;

      if (!ordersSnapshot.empty) {
        this.orders = []; // Clear existing inventories array

        ordersSnapshot.forEach((doc: firebase.firestore.QueryDocumentSnapshot<OrderItem>) => {
          const orderData = doc.data();
          this.orders.push(orderData);
        });
      } else {
        console.log("No orders found.");
      }
    } catch (error) {
      console.error('Error fetching inventories from Firestore:', error);
      this.showToast('Error fetching inventories');
    }
  }

  async generatePDF(selectedOrder: OrderItem) {
    const deliverDate = new Date(selectedOrder.dateOfPickup);
    const pickedDate = deliverDate.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const pickedTime = deliverDate.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    try {
      const docDefinition = {
        content: [
          { text: 'Receipt', style: 'header' },
          [
            { text: 'Item Name: ' + selectedOrder.itemName },
            { text: 'Bar Code: ' + selectedOrder.barcode },
            { text: 'Pickers Details: ' + selectedOrder.pickersDetails },
            { text: 'Description: ' + selectedOrder.description },
            { text: 'Date of Pickup: ' + selectedOrder.dateOfPickup },
            { text: 'Time of Pickup: ' + selectedOrder.timeOfPickup },
            { text: 'Quantity: ' + selectedOrder.quantity },
            { text: ' ', style: 'spacer' }
          ]
        ],
        styles: {
          header: {
            fontSize: 18,
            bold: true,
            margin: [0, 0, 0, 10]
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 5, 0, 5]
          },
          spacer: {
            margin: [0, 10]
          }
        } as any
      };

      pdfMake.createPdf(docDefinition).download('picker_receipt.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
      this.showToast('Error generating PDF');
    }
  }

  async showToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 4000
    });
    toast.present();
  }
}
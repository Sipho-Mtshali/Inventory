import { Component } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize } from 'rxjs/operators';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
const pdfMake = require('pdfmake/build/pdfmake.js');

@Component({
  selector: 'app-add-inventory',
  templateUrl: './add-inventory.page.html',
  styleUrls: ['./add-inventory.page.scss'],
})
export class AddInventoryPage {
  itemName: string = '';
  itemCategory: string = '';
  itemDescription: string = '';
  itemQuantity: number = 0;
  pickersDetails: string = '';
  dateOfPickup: string = '';
  timeOfPickup: string = '';
  barcode: string = '';
  imageBase64: any;
  imageUrl: string | null = null;
  cart: any[] = [];

  constructor(
    private firestore: AngularFirestore,
    private storage: AngularFireStorage,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });
    this.imageBase64 = image.base64String;
  }

  async uploadImage(file: string) {
    const fileName = Date.now().toString();
    const filePath = `images/${fileName}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = fileRef.putString(file, 'base64', {
      contentType: 'image/jpeg',
    });
    const snapshot = await uploadTask;
    return snapshot.ref.getDownloadURL();
  }

  async addItem() {
    const loader = await this.loadingController.create({
      message: 'Adding Inventory...',
    });
    await loader.present();

    try {
      if (this.imageBase64) {
        this.imageUrl = await this.uploadImage(this.imageBase64);
      }

      const newItem = {
        name: this.itemName,
        category: this.itemCategory,
        description: this.itemDescription,
        imageUrl: this.imageUrl || '',
        quantity: this.itemQuantity,
        pickersDetails: this.pickersDetails,
        dateOfPickup: this.dateOfPickup,
        timeOfPickup: this.timeOfPickup,
        barcode: this.barcode || '',
        timestamp: new Date(),
      };
      this.cart.push(newItem);
      this.presentToast('Item added to cart', 'success');
      await this.firestore.collection('inventory').add(newItem);
      this.clearFields();
    } catch (error) {
      console.error('Error adding inventory:', error);
      // Handle error
    } finally {
      loader.dismiss();
    }
  }

  async generateSlip() {
    const loader = await this.loadingController.create({
      message: 'Generating Slip...',
    });
    await loader.present();

    try {
      // Create a slip document in Firestore
      const slipData = {
        date: new Date(),
        items: this.cart.map((item) => ({
          name: item.name,
          quantity: item.quantity,
          category: item.category,
          description: item.description,
          imageUrl: item.imageUrl,
          pickersDetails: item.pickersDetails,
          dateOfPickup: item.dateOfPickup,
          timeOfPickup: item.timeOfPickup,
          barcode: item.barcode,
        })),
      };
      await this.firestore.collection('slips').add(slipData);

      // Generate PDF
      pdfMake.vfs = pdfFonts.pdfMake.vfs;
      const docDefinition = {
        content: [
          {
            text: 'BEST BRIGHT', // Adding the company name to the header
            style: 'companyName',
          },
          {
            text: 'Invoice',
            style: 'header',
          },
          {
            text: `Date: ${new Date().toLocaleDateString()}`, // Fixed syntax issue
            style: 'subheader',
          },
          {
            table: {
              headerRows: 1,
              widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
              body: [
                [
                  { text: 'Name', style: 'tableHeader' },
                  { text: 'Quantity', style: 'tableHeader' },
                  { text: 'Category', style: 'tableHeader' },
                  { text: 'Description', style: 'tableHeader' },
                  { text: 'Picker\'s Details', style: 'tableHeader' },
                  { text: 'Date of Pickup', style: 'tableHeader' },
                  { text: 'Time of Pickup', style: 'tableHeader' },
                  { text: 'Barcode', style: 'tableHeader' },
                  { text: 'Image', style: 'tableHeader' },
                ],
                ...this.cart.map((item) => [
                  { text: item.name, style: 'tableCell' },
                  { text: item.quantity.toString(), style: 'tableCell' },
                  { text: item.category, style: 'tableCell' },
                  { text: item.description, style: 'tableCell' },
                  { text: item.pickersDetails, style: 'tableCell' },
                  { text: item.dateOfPickup, style: 'tableCell' },
                  { text: item.timeOfPickup, style: 'tableCell' },
                  { text: item.barcode, style: 'tableCell' },
                  { image: item.imageUrl, width: 50, height: 50 },
                ]),
              ],
            },
          },
        ],
        styles: {
          header: {
            fontSize: 24,
            bold: true,
            margin: [0, 0, 0, 10],
            alignment: 'center',
            color: '#007bff', // Blue color for the header
          },
          subheader: {
            fontSize: 14,
            bold: true,
            margin: [0, 10, 0, 10],
          },
          tableHeader: {
            bold: true,
            fontSize: 12,
            color: 'black',
            alignment: 'center',
            fillColor: '#f2f2f2', // Background color for the header
          },
          tableCell: {
            fontSize: 12,
            alignment: 'center',
          },
          companyName: {
            fontSize: 28,
            bold: true,
            margin: [0, 0, 0, 20],
            alignment: 'center',
            color: '#dc3545',
          },
        },
      };
      const pdfDocGenerator = pdfMake.createPdf(docDefinition);
      pdfDocGenerator.open();

      // Clear the cart after generating the slip
      this.cart = [];

      // Show success toast notification with a done button
      this.presentToast('Slip generated successfully', 'success', true);
    } catch (error) {
      console.error('Error generating slip:', error);
      // Handle error
    } finally {
      loader.dismiss();
    }
  }

  clearFields() {
    this.itemName = '';
    this.itemCategory = '';
    this.itemDescription = '';
    this.itemQuantity = 0;
    this.pickersDetails = '';
    this.dateOfPickup = '';
    this.timeOfPickup = '';
    this.barcode = '';
    this.imageBase64 = null;
    this.imageUrl = null;
  }

  async presentToast(
    message: string,
    color: string = 'success',
    showButton: boolean = false
  ) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: color,
      buttons: showButton
        ? [
            {
              text: 'Done',
              role: 'cancel',
            },
          ]
        : [],
    });
    toast.present();
  }
}

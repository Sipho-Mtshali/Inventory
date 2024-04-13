import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { LoadingController, NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-update-inventory',
  templateUrl: './update-inventory.page.html',
  styleUrls: ['./update-inventory.page.scss'],
})
export class UpdateInventoryPage implements OnInit {
  barcode!: string; // Variable to hold the ID of the inventory item
  itemName: string = '';
  itemCategory: string = '';
  itemDescription: string = '';
  itemQuantity: number = 0;
  selectedFile: File | null = null;
  productInfor: any;
  imageBase64: any;
  toggleChecked: boolean = false;
  imageUrl: any;
  imageInfor:any;
  newImage :any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firestore: AngularFirestore,
    private fireStorage: AngularFireStorage,
    private toastController: ToastController
  ) {}
  
  ngOnInit() {
    this.getPassedData();
    document.querySelector('body')?.classList.remove('scanner-active'); 
  }

  async scanBarcode() {
    document.querySelector('body')?.classList.add('scanner-active');
    await BarcodeScanner.checkPermission({ force: true });
    const result = await BarcodeScanner.startScan();
    if (result.hasContent) {
      this.barcode = result.content;
      console.log(result.content);
    }
  }

  async deleteFileIfExists(url: string): Promise<void> {
    if (url) {
      try {
        const fileRef = this.fireStorage.storage.refFromURL(url);
        await fileRef.delete();
      } catch (error) {
        console.error('Error deleting file:', error);
      }
    }
  }

  async updateItem() {
    if (this.imageBase64) {
      await this.deleteFileIfExists(this.productInfor.imageUrl);
      this.imageUrl = await this.uploadImage(this.imageBase64);
    }

    const existingItemQueryStore = await this.firestore
      .collection('inventory')
      .ref.where('barcode', '==', this.barcode)
      .get();
  
    if (!existingItemQueryStore.empty) {
      const existingItemDoc = existingItemQueryStore.docs[0];
      await existingItemDoc.ref.update({
        name: this.itemName,
        category: this.itemCategory,
        description: this.itemDescription,
        barcode:this.barcode,
        quantity: this.itemQuantity,
        timestamp: new Date(), 
        imageUrl: this.imageUrl
      });

      this.presentToast('Item updated successfully!');
    }
  }

  toggleMode() {
    if (this.toggleChecked) {
      this.barcode = '';
      BarcodeScanner.showBackground();
      BarcodeScanner.stopScan();
      document.querySelector('body')?.classList.remove('scanner-active'); 
    }
  }

  clearFields() {
    this.itemName = '';
    this.itemCategory = '';
    this.itemDescription = '';
    this.itemQuantity = 0;
    this.selectedFile = null;
  }

  onFileSelected(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files) {
      this.selectedFile = inputElement.files[0];
    }
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    });
    this.imageBase64 = image.base64String;
    this.newImage = `data:image/jpeg;base64,${image.base64String}`;
  }

  async uploadImage(file: string) {
    const fileName = Date.now().toString();
    const filePath = `images/${fileName}`;
    const fileRef = this.fireStorage.ref(filePath);
    const uploadTask = fileRef.putString(file, 'base64', {
      contentType: 'image/jpeg',
    });
    const snapshot = await uploadTask;
    return snapshot.ref.getDownloadURL();
  }

  async getPassedData() {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.productInfor = await this.router.getCurrentNavigation()?.extras.state;
      console.log(this.productInfor);
      this.barcode = this.productInfor.barcode;
      this.itemName = this.productInfor.name;
      this.itemCategory = this.productInfor.category;
      this.itemDescription = this.productInfor.description;
      this.itemQuantity = this.productInfor.quantity;
      this.newImage = this.productInfor.imageUrl;
      this.imageUrl = this.productInfor.imageUrl;
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
      color: 'success' 
    });
    toast.present();
  }
  
}

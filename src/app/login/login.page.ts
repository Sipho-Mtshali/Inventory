import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage{
  email: any;
  password: any;

  constructor(
    private afAuth: AngularFireAuth, 
    private router: Router, 
    private toastController: ToastController
    ) { }
    async presentToast(message: string, color: string, duration: number = 2000) {
      const toast = await this.toastController.create({
        message: message,
        duration: duration,
        position: 'top',
        color: color,
      });
      await toast.present();
    }


  async login() {
    try {
      if (!this.password && !this.email) {
        await this.presentToast('Please enter your EMAIL & PASSWORD', 'danger');
        return;
      }
      if (!this.password) {
        await this.presentToast('Please enter a PASSWORD', 'danger');
        return;
      }
      if (!this.email) {
        await this.presentToast('Please enter a EMAIL', 'danger');
        return;
      }
      const userCredential = await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      this.router.navigate(['/inventory']);
    this.presentToast('Successful login', 'success');
    } catch (error) {
      this.presentToast('Incorrect password or Username. Please try again.', 'danger');
    }
  }
}
 

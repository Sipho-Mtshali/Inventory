import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  email: any;
  password: any;
  confirmPassword: any;

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

  async register() {
    try {
      // Check if email and password are provided
      if (!this.password || !this.email) {
        await this.presentToast('Please fill all required details (email & password)', 'danger');
        return;
      }
  
      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        await this.presentToast('Please enter a valid email address', 'danger');
        return;
      }
  
      // Check if password and confirm password match
      if (this.password !== this.confirmPassword) {
        await this.presentToast('Passwords do not match', 'danger');
        return;
      }
  
      // Check if password length is at least 6 characters
      if (this.password.length < 6) {
        await this.presentToast('Password should be at least 6 characters', 'danger');
        return;
      }
  
      // Create user with email and password
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      this.router.navigate(['/login']);
      this.presentToast('Registration successful', 'success');
    } catch (error: any) { // Specify the type of error as 'any'
      console.error('Error during registration:', error);
      if (error.code === 'auth/email-already-in-use') {
        await this.presentToast('Email is already in use. Please try with a different email address.', 'danger');
      } else {
        await this.presentToast('Registration failed. Please try again later.', 'danger');
      }
    }
  }
}  
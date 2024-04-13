import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage implements OnInit {
  email: any;

  constructor(
    private afAuth: AngularFireAuth,
    private toastController: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
  }
  async presentToast(message: string, color: string, duration: number = 2000) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration,
      position: 'top',
      color: color,
    });
    await toast.present();
  }
  async reset() {
    if (!this.email) {
        this.presentToast('Enter your email', 'danger');
        return;
    }
    try {
        // Attempt to send password reset email
        await this.afAuth.sendPasswordResetEmail(this.email);
        // If no error is thrown, it means the email exists
        this.presentToast('Password reset email sent. Check your inbox.', 'success');
        this.router.navigate(['/login']);
    } catch (error:any) {
        // Check if the error is due to email not existing
        if (error.code === 'auth/user-not-found') {
            // Email does not exist
            this.presentToast('Email does not exist', 'danger');
            // Navigate to login page
            this.router.navigate(['/login']);
        } else {
            // Other errors
            const errorMessage = (error as { message: string }).message; // Type assertion
            this.presentToast(errorMessage, 'danger');
        }
    }
  }
}

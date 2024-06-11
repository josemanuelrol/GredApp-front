import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {

  time:number;

  constructor(private toastController: ToastController) {
    this.time = 2000
  }

  async presentErrorToast(position: 'top' | 'middle' | 'bottom', message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: this.time,
      position: position,
      color: 'danger',
      icon: 'close'
    });

    await toast.present();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: this.time,
      position: position,
    });

    await toast.present();
  }

  async presentSuccessToast(position: 'top' | 'middle' | 'bottom', message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: this.time,
      position: position,
      color: 'success',
      icon: 'checkmark'
    });

    await toast.present();
  }

  async presentWarningToast(position: 'top' | 'middle' | 'bottom', message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: this.time,
      position: position,
      color: 'warning',
      icon: 'alert'
    });

    await toast.present();
  }

}

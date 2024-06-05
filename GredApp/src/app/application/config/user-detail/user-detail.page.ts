import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButton, IonIcon, IonRow, IonGrid, IonCol, IonList, IonListHeader, IonItem, IonLabel, IonInput, LoadingController, IonNote, AlertController } from '@ionic/angular/standalone';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/user';
import { ToastServiceService } from 'src/app/core/services/toast-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.page.html',
  styleUrls: ['./user-detail.page.scss'],
  standalone: true,
  imports: [IonNote, ReactiveFormsModule, IonInput, IonLabel, IonItem, IonListHeader, IonList, IonCol, IonGrid, IonRow, IonIcon, IonButton, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class UserDetailPage implements OnInit {

  private userService = inject(UserService);
  private toastService = inject(ToastServiceService);
  private router = inject(Router);

  usernameControl: FormControl = new FormControl();
  emailControl: FormControl = new FormControl();

  user: User = {}
  userID: string = "";

  constructor(private loadingController: LoadingController, private alertCtrl: AlertController) {}

  ngOnInit() {
    this.showLoading();
    this.userID = localStorage.getItem('userID')!;
    this.userService.getUserById(this.userID).then((response) => {
      this.user = response;
      this.usernameControl = new FormControl(this.user.username, Validators.required);
      this.emailControl = new FormControl(this.user.email, [Validators.required, Validators.email]);
      this.loadingController.dismiss();
    }).catch((error) => {
      this.loadingController.dismiss();
      this.toastService.presentErrorToast('top', 'Ha ocurrido un error');
    })
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });

    loading.present();
  }

  onBack() {
    if (this.user.username != this.usernameControl.getRawValue() || this.user.email != this.emailControl.getRawValue()) {
      let user: User = {
        username: this.usernameControl.getRawValue(),
        email: this.emailControl.getRawValue()
      };
      this.userService.updateUser(this.userID, user).then((response) => {
        this.toastService.presentSuccessToast('top', 'El usuario se ha modificado')
      }).catch((error) => {
        this.toastService.presentErrorToast('top', 'Ha ocurrido un error');
      })
    }
  }

  async onChangePassword() {
    const alert = await this.alertCtrl.create({
      header: 'Cambiar contraseña',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Cambiar',
          role: 'change',
          handler: (data: any) => {
            let body = {
              password: data[0],
              newPassword: data[1],
              confirmPassword: data[2]
            }
            this.userService.cambiarContraseña(this.userID, body).then((response) => {
              this.toastService.presentSuccessToast('top', response.mensaje);
            }).catch((error) => {
              this.toastService.presentErrorToast('top', error.error.error);
            })
          },
        }
      ],
      inputs: [
        {
          placeholder: 'Contraseña actual',
          type: 'password'
        },
        {
          placeholder: 'Nueva contraseña',
          type: 'password'
        },
        {
          placeholder: 'Confirmar contraseña',
          type: 'password'
        }
      ]
    })

    await alert.present()
  }

  async onDeleteAccount() {
    const alert = await this.alertCtrl.create({
      header: '¿Desea eliminar su cuenta?',
      message: 'Esta cuenta se eliminará permanentemente y perderá todos sus datos',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'delete',
          handler: () => {
            this.userService.deleteUser(this.userID).then((reponse) => {
              this.router.navigate(['auth'])
              this.toastService.presentSuccessToast('top', 'Su cuenta ha sido eliminada correctamente');
            }).catch((error) => {
              this.toastService.presentErrorToast('top', 'Ha ocurrido un error');
            })
          },
        }
      ]
    })

    await alert.present()
  }

}

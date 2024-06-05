import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadingController, IonThumbnail, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonRow, IonCol, IonGrid, IonInput, IonButton, IonIcon, IonToast, ToastController, IonLabel } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import { ToastServiceService } from 'src/app/core/services/toast-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonThumbnail, IonLabel, IonIcon, IonButton, IonInput, IonGrid, IonCol, IonRow, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonContent, CommonModule, ReactiveFormsModule, IonToast]
})
export class LoginPage implements OnInit {

  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router)
  toastService = inject(ToastServiceService);

  loginForm:FormGroup;

  get usernameControl() {return this.loginForm.get('username') as FormControl}
  get passwordControl() {return this.loginForm.get('password') as FormControl}

  constructor(private formBuilder:FormBuilder, private toastController: ToastController, private loadingController: LoadingController) {
    this.loginForm = formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
    console.log("")
  }

  async login(){
    this.showLoading();
    await this.authService.login(this.loginForm.value).then((result) => {
        if (result.login){
          localStorage.setItem('userID',result.user_id)
          localStorage.setItem('token', result.token)
          this.router.navigate(['/app'])
          this.loadingController.dismiss()
        }
    }).catch(async(error)=>{
      localStorage.clear()
      this.loadingController.dismiss();
      this.toastService.presentErrorToast('top',error.error.error);
    });
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });

    loading.present();
  }

}

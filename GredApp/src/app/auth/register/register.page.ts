import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonInputPasswordToggle, LoadingController, IonContent, IonHeader, IonTitle, IonToolbar, IonCardTitle, ToastController, IonRow, IonCol, IonGrid, IonCardContent, IonCardHeader, IonCard, IonButton, IonInput, IonIcon, IonCardSubtitle, IonLabel } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/core/services/toast-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonInputPasswordToggle, IonLabel, IonCardSubtitle, IonIcon, IonButton, IonCard, IonCardHeader, IonCardContent, IonGrid, IonCol, IonRow, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonInput]
})
export class RegisterPage implements OnInit {

  authService = inject(AuthService);
  router = inject(Router)
  toastService = inject(ToastServiceService);

  registerForm:FormGroup;

  get usernameControl() {return this.registerForm.get('username') as FormControl}
  get passwordControl() {return this.registerForm.get('password') as FormControl}
  get emailControl() {return this.registerForm.get('email') as FormControl}

  constructor(private formBuilder:FormBuilder, private toastController: ToastController, private loadingController: LoadingController) {
    this.registerForm = formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    })
  }

  ngOnInit() {
    console.log("")
  }

  register(){
    this.showLoading()
    this.authService.register(this.registerForm.value).then(async (result)=>{
        if (result.mensaje){
          this.toastService.presentSuccessToast('top',result.mensaje);
          this.router.navigate(['/auth/login'])
          this.loadingController.dismiss()
        }
    }).catch(async (error)=>{
      localStorage.clear();
      this.loadingController.dismiss();
      this.toastService.presentErrorToast('top',error.error.error);
    });
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Creating account...',
    });

    loading.present();
  }

}

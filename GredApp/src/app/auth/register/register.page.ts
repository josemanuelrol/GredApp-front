import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCardTitle, ToastController, IonRow, IonCol, IonGrid, IonCardContent, IonCardHeader, IonCard, IonButton, IonInput, IonIcon, IonCardSubtitle } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular'

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonCardSubtitle, IonIcon, IonButton, IonCard, IonCardHeader, IonCardContent, IonGrid, IonCol, IonRow, IonCardTitle, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, ReactiveFormsModule, IonInput]
})
export class RegisterPage implements OnInit {

  authService = inject(AuthService);
  router = inject(Router)

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
    console.log("Register")
  }

  register(){
    this.showLoading()
    this.authService.register(this.registerForm.value).then(async (result)=>{
      console.log(result)
        if (result.mensaje){
          const toast = await this.toastController.create({
            message: result.mensaje,
            duration: 2000,
            position: "top",
            icon: 'globe'
          });
          await toast.present();
          this.router.navigate(['/auth/login'])
          this.loadingController.dismiss()
        }
    }).catch(async (error)=>{
      localStorage.clear();
      this.loadingController.dismiss();
        const toast = await this.toastController.create({
          message: error.error.error,
          duration: 2000,
          position: "top",
          icon: 'alert-outline'
        });
        await toast.present();
    });
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Creating account...',
    });

    loading.present();
  }

}

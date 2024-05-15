import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonRow, IonCol, IonGrid, IonInput, IonButton, IonIcon, IonToast, ToastController } from '@ionic/angular/standalone';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonInput, IonGrid, IonCol, IonRow, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonContent, CommonModule, ReactiveFormsModule, IonToast]
})
export class LoginPage implements OnInit {

  authService = inject(AuthService);
  router = inject(Router)

  loginForm:FormGroup;

  get usernameControl() {return this.loginForm.get('username') as FormControl}
  get passwordControl() {return this.loginForm.get('password') as FormControl}

  constructor(private formBuilder:FormBuilder, private toastController: ToastController) {
    this.loginForm = formBuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    })
  }

  ngOnInit() {
    console.log("Login")
  }

  login(){
    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        console.log(response)
        if (response.login){
          localStorage.setItem('token', response.token)
          this.router.navigate(['/app'])
        }
      },
      error:async (error)=>{
        localStorage.clear()
        const toast = await this.toastController.create({
          message: error.error.error,
          duration: 2000,
          position: "top",
          icon: 'alert-outline'
        });
        await toast.present();
      }
    });
  }

  async onClick(){
    console.log(localStorage.getItem('token'))
  }

}

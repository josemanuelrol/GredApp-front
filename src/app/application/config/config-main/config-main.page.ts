import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonListHeader, IonIcon, IonLabel, IonGrid, IonCol, IonRow, IonButton, IonToggle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/core/services/toast-service.service';

@Component({
  selector: 'app-config-main',
  templateUrl: './config-main.page.html',
  styleUrls: ['./config-main.page.scss'],
  standalone: true,
  imports: [IonToggle, IonButton, IonRow, IonCol, IonGrid, IonLabel, IonIcon, IonListHeader, IonItem, IonList, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ConfigMainPage implements OnInit {

  private router = inject(Router);
  private toastService = inject(ToastServiceService);

  constructor() { }

  paletteToggle = false;

  ngOnInit() {
    // Use matchMedia to check the user preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    // Initialize the dark palette based on the initial
    // value of the prefers-color-scheme media query
    this.initializeDarkPalette(prefersDark.matches);

    // Listen for changes to the prefers-color-scheme media query
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches));
  }

  // Check/uncheck the toggle and update the palette based on isDark
  initializeDarkPalette(isDark:any) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  // Listen for the toggle check/uncheck to toggle the dark palette
  toggleChange(ev:any) {
    this.toggleDarkPalette(ev.detail.checked);
  }

  // Add or remove the "ion-palette-dark" class on the html element
  toggleDarkPalette(shouldAdd:any) {
    document.documentElement.classList.toggle('ion-palette-dark', shouldAdd);
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(['auth'])
    this.toastService.presentSuccessToast('top','Has cerrado sesión')
  }

  onClickProfile(){
    this.router.navigate(['app/config/user-detail']);
  }

}

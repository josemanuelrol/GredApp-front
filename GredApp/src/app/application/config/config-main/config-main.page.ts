import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-config-main',
  templateUrl: './config-main.page.html',
  styleUrls: ['./config-main.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ConfigMainPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("Configuración")
  }

}

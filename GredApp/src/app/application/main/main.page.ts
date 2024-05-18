import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabs, IonIcon, IonTabButton, IonTabBar, IonRouterOutlet, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonTabs, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MainPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("Main")
  }

}

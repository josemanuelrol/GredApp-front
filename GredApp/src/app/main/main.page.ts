import { HeaderComponent } from './../shared/components/header/header.component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonTabs, IonIcon, IonTabButton, IonTabBar, IonRouterOutlet } from '@ionic/angular/standalone';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
  standalone: true,
  imports: [HeaderComponent, IonRouterOutlet, IonTabBar, IonTabButton, IonIcon, IonTabs, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class MainPage implements OnInit {

  nameTab:string = "home";

  constructor() { }

  ngOnInit() {
    console.log("Main")
  }

  getTab(tab:any){
    switch(tab.tab){
      case 'home':
        this.nameTab = 'Home'
        break;
      case 'tasks':
        this.nameTab = 'Tareas'
        break;
      case 'calendar':
        this.nameTab = 'Calendario'
        break;
      case 'notes':
        this.nameTab = 'Notas'
        break;
    }
  }

}

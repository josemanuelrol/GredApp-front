import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-calendar-main',
  templateUrl: './calendar-main.page.html',
  styleUrls: ['./calendar-main.page.scss'],
  standalone: true,
  imports: [IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CalendarMainPage implements OnInit {

  myBirthday:any

  constructor() { }

  ngOnInit() {
    console.log("Calendario")
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-calendar-main',
  templateUrl: './calendar-main.page.html',
  styleUrls: ['./calendar-main.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CalendarMainPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("Calendario")
  }

}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-tasks-main',
  templateUrl: './tasks-main.page.html',
  styleUrls: ['./tasks-main.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TasksMainPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("Tareas")
  }

}

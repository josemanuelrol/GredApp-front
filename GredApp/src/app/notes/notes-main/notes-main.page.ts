import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-notes-main',
  templateUrl: './notes-main.page.html',
  styleUrls: ['./notes-main.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NotesMainPage implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log("Notas")
  }

}

import { Event } from './../../../core/models/event';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar } from '@ionic/angular/standalone';
import { Note } from 'src/app/core/models/note';
import { NotesService } from 'src/app/core/services/notes.service';

@Component({
  selector: 'app-notes-main',
  templateUrl: './notes-main.page.html',
  styleUrls: ['./notes-main.page.scss'],
  standalone: true,
  imports: [IonSearchbar, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NotesMainPage implements OnInit {

  notesService = inject(NotesService);

  notesList: Note[];
  notesListResult: Note[];
  userId:string;

  constructor() {
    this.notesList = [];
    this.notesListResult = [];
    this.userId = localStorage.getItem('userID')!;
  }

  ngOnInit() {
    console.log("Notas")
    this.notesService.getNotesByUser(this.userId).then((response) => {
      this.notesList = response;
      this.notesListResult = [...this.notesList]
    }).catch((error)=>{
      alert(error.error.error);
    });
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.notesListResult = this.notesList.filter((n) => n.titulo.toLowerCase().indexOf(query) > -1);
  }

}

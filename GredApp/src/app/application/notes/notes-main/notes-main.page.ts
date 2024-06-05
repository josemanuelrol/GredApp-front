import { ToastServiceService } from 'src/app/core/services/toast-service.service';
import { ID } from './../../../core/models/id';
import { Event } from './../../../core/models/event';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingController, IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonIcon, IonFab, IonFabButton, IonRefresher, IonRefresherContent } from '@ionic/angular/standalone';
import { Note } from 'src/app/core/models/note';
import { NotesService } from 'src/app/core/services/notes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes-main',
  templateUrl: './notes-main.page.html',
  styleUrls: ['./notes-main.page.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, IonFabButton, IonFab, IonIcon, IonCardTitle, IonCardContent, IonCardHeader, IonCard, IonSearchbar, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NotesMainPage implements OnInit {

  private notesService = inject(NotesService);
  private router = inject(Router);
  private toastService = inject(ToastServiceService);

  notesList: Note[];
  notesListResult: Note[];
  userId:string;
  emptyMessage:string = ''

  constructor(private loadingController: LoadingController) {
    this.notesService.onDataUpdate().subscribe(()=>this.loadNotes());
    this.notesList = [];
    this.notesListResult = [...this.notesList];
    this.userId = localStorage.getItem('userID')!;
  }

  ngOnInit() {
    this.loadNotes();
  }

  loadNotes(){
    this.showLoading();
    this.notesService.getNotesByUser(this.userId).then((response) => {
      this.notesList = response;
      this.notesListResult = [...this.notesList]
      this.emptyMessage = 'No tienes notas todavía'
      this.loadingController.dismiss()
    }).catch((error)=>{
      this.loadingController.dismiss();
      this.toastService.presentErrorToast('top','Ha ocurrido un error');
      });
  }

  handleRefresh(event:any){
    this.notesService.getNotesByUser(this.userId).then((response) => {
      this.notesList = response;
      this.notesListResult = [...this.notesList]
      event.target.complete()
    }).catch((error)=>{
      this.toastService.presentErrorToast('top','Ha ocurrido un error');
    });
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.notesListResult = this.notesList.filter((n) => n.titulo.toLowerCase().indexOf(query) > -1);
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });

    loading.present();
  }

  trackItems(index: number, itemObject: any) {
    return itemObject._id;
  }

  onClick(note:Note){
    this.router.navigate(['app/notes/note-detail'],{
      state:{
        key: note._id!.$oid,
        data: note
      }
    })
  }

  createNote(){
    this.router.navigate(['app/notes/note-detail'], {
      state: {
        key: 0,
        data: {titulo: '', contenido: ''}
      }
    });
  }

}

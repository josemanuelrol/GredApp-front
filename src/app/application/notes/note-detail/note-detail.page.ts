import { Router } from '@angular/router';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AlertController, IonContent, IonHeader, IonTitle, IonToolbar, IonSearchbar, IonTextarea, IonButton, IonIcon, IonBackButton } from '@ionic/angular/standalone';
import { Note } from 'src/app/core/models/note';
import { NotesService } from 'src/app/core/services/notes.service';
import { ToastServiceService } from 'src/app/core/services/toast-service.service';

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.page.html',
  styleUrls: ['./note-detail.page.scss'],
  standalone: true,
  imports: [IonBackButton, ReactiveFormsModule, IonIcon, IonButton, IonTextarea, IonSearchbar, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class NoteDetailPage implements OnInit {

  private router = inject(Router);
  private notesService = inject(NotesService);
  private toastService = inject(ToastServiceService);

  note: Note = { titulo: '', contenido: '' };

  tituloControl: FormControl
  contenidoControl: FormControl

  private alertButtons:any = []

  constructor(private alertCtrl: AlertController) {
    this.tituloControl = new FormControl('', Validators.required);
    this.contenidoControl = new FormControl('', Validators.required);
    this.alertButtons = [
      {
        text: 'Cancelar',
        role: 'cancel',
      },
      {
        text: 'Eliminar',
        role: 'delete',
        handler: () => {
          this.notesService.deleteNote(this.note._id!.$oid).then((response)=>{
            this.notesService.emitDataUpdated();
            this.router.navigate(['app/notes']);
          }).catch((error)=>{
            this.toastService.presentErrorToast('top','Ha ocurrido un error');
          })
        },
      }
    ];
  }

  ngOnInit() {
    const params = this.router.getCurrentNavigation()!.extras.state;
    this.note = params!['data'];
    this.tituloControl.setValue(this.note.titulo);
    this.contenidoControl.setValue(this.note.contenido);
  }

  onBack() {
    let note:Note = {
      'user_id':localStorage.getItem('userID')!,
      'titulo':this.tituloControl.getRawValue(),
      'contenido':this.contenidoControl.getRawValue()
    }
    if (this.note.titulo == '' && this.note.contenido == ''){
      if (this.tituloControl.valid){
        this.notesService.createNote(note).then((response)=>{
          this.notesService.emitDataUpdated();
        }).catch((error)=>{
          this.toastService.presentErrorToast('top','Ha ocurrido un error');
        })
      }
    }else if (this.note.titulo != ''){
      if (this.note.titulo != this.tituloControl.getRawValue() || this.note.contenido != this.contenidoControl.getRawValue())
      this.notesService.updateNote(this.note._id!.$oid, note).then((response)=>{
        this.notesService.emitDataUpdated();
      }).catch((error)=>{
        this.toastService.presentErrorToast('top','Ha ocurrido un error');
      })
    }
  }

  async onDelete() {
    const alert = await this.alertCtrl.create({
      header: '¿Desea eliminar esta nota?',
      message: 'Esta nota será eliminada permanentemente',
      buttons: this.alertButtons
    })

    await alert.present()
  }
}

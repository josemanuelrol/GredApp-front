import { Task } from './../../../core/models/task';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule, Validators } from '@angular/forms';
import { IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonContent, IonInput, IonItem, ModalController, IonRow, IonGrid, IonCol, IonTextarea, IonSelect, IonSelectOption, IonCheckbox, IonLabel } from "@ionic/angular/standalone";

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss'],
  standalone: true,
  imports: [FormsModule, IonLabel, IonCheckbox, IonSelect, IonSelectOption, IonTextarea, IonCol, IonGrid, IonRow, ReactiveFormsModule, IonItem, IonInput, IonContent, IonTitle, IonButton, IonButtons, IonToolbar, IonHeader]
})
export class TaskDetailComponent  implements OnInit {

  @Input() data:any;

  tituloControl:FormControl = new FormControl();
  descripcionControol:FormControl = new FormControl();

  constructor(private modalCtrl: ModalController) {}

  ngOnInit(): void {
    this.tituloControl = new FormControl(this.data.titulo, Validators.required);
    this.descripcionControol = new FormControl(this.data.descripcion);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    let bodyTask:Task = {
      titulo : this.tituloControl.getRawValue(),
      descripcion : this.descripcionControol.getRawValue()
    }
    return this.modalCtrl.dismiss(bodyTask, 'confirm');
  }

}

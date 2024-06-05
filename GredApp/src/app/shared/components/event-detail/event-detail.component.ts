import { Event } from './../../../core/models/event';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonHeader, IonContent, IonGrid, IonToolbar, IonButton, IonButtons, ModalController, IonCol, IonRow, IonInput, IonTitle, IonToggle, IonList, IonItem, IonNote, IonDatetime, IonModal, IonDatetimeButton, IonLabel } from "@ionic/angular/standalone";
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss'],
  standalone: true,
  imports: [IonLabel, IonDatetimeButton, IonModal, IonDatetime, IonNote, IonItem, IonList, IonToggle, IonTitle, IonInput, IonRow, IonCol, IonButtons, IonButton, IonToolbar, IonGrid, IonContent, IonHeader, ReactiveFormsModule]
})
export class EventDetailComponent  implements OnInit {

  @Input() data:any;

  allDay:boolean;
  actualISODate:any;
  onlyDate:any;
  dateTime:any;
  userID:string;

  tituloControl:FormControl;

  constructor(private modalCtrl:ModalController) {
    this.userID = localStorage.getItem('userID')!;
    this.tituloControl = new FormControl('',Validators.required);
    this.allDay = false;
  }

  ngOnInit() {
    if(this.data['titulo']){
      this.actualISODate = this.formatDateToISO(new Date(this.data['fecha']));
      this.onlyDate = new Date(this.data['fecha']);
      this.dateTime = new Date(this.data['fecha']);
      this.allDay = this.data['allDay'];
      this.tituloControl.setValue(this.data['titulo']);
    }else{
      this.actualISODate = this.formatDateToISO(this.data);
      this.onlyDate = new Date(this.data);
      this.dateTime = new Date(this.data);
    }
  }

  formatDateToISO(date:Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    let newEvent:Event = {};
    if (this.allDay){
      newEvent = {
        user_id:this.userID,
        titulo:this.tituloControl.getRawValue(),
        fecha:formatDate(this.onlyDate,'yyyy-MM-dd','es'),
        allDay:true
      }
    }else{
      newEvent = {
        user_id:this.userID,
        titulo:this.tituloControl.getRawValue(),
        fecha:formatDate(this.dateTime,'yyyy-MM-dd HH:mm','es'),
        allDay:false
      }
    }
    return this.modalCtrl.dismiss(newEvent, 'confirm');
  }

  handleToggle(ev:any){
    this.allDay = ev.detail.checked;
  }

  handleDate(ev:any){
    this.onlyDate = ev.detail.value;
  }

  handleDateTime(ev:any){
    this.dateTime = ev.detail.value;
  }

}

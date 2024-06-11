import { ModalController, IonCard, IonCardTitle, IonCardContent, IonCardHeader, IonInput, IonList } from '@ionic/angular/standalone';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonDatetime, IonButtons, IonButton, IonFab, IonFabButton, IonIcon, IonGrid, IonRow, IonCol, LoadingController, IonSearchbar } from '@ionic/angular/standalone';
import { EventsService } from 'src/app/core/services/events.service';
import { ToastServiceService } from 'src/app/core/services/toast-service.service';
import { Event } from 'src/app/core/models/event';
import { EventDetailComponent } from 'src/app/shared/components/event-detail/event-detail.component';
import { EventCardComponent } from 'src/app/shared/components/event-card/event-card.component';
import localeES from '@angular/common/locales/es'
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeES,'es')

@Component({
  selector: 'app-calendar-main',
  templateUrl: './calendar-main.page.html',
  styleUrls: ['./calendar-main.page.scss'],
  standalone: true,
  imports: [EventCardComponent, IonList, IonInput, IonCardHeader, IonCardContent, IonCardTitle, IonCard, IonSearchbar, IonCol, IonRow, IonGrid, IonIcon, IonFabButton, IonFab, IonButton, IonButtons, IonDatetime, IonLabel, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CalendarMainPage implements OnInit {

  private eventService = inject(EventsService);
  private toastService = inject(ToastServiceService);

  events:Event[];
  eventsResult:Event[];
  nextEvents:Event[];
  date:Date;
  actualISODate:string;
  userID:string;

  constructor(private modalController:ModalController, private loadingController:LoadingController) {
    this.eventService.onDataUpdate().subscribe(() => this.loadEvents());
    this.userID = localStorage.getItem('userID')!;
    this.events = [];
    this.eventsResult = [];
    this.nextEvents = [];
    this.date = new Date(formatDate(new Date(),'yyyy-MM-dd HH:mm','es'));
    this.actualISODate = this.formatDateToISO(this.date)
  }

  ngOnInit(): void {
    this.loadEvents();
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

  loadEvents(){
    this.showLoading();
    this.eventService.getUserEvents(this.userID).then((response)=>{
      this.events = response;
      this.eventsResult = this.events.filter((event)=> this.checkDate(event.fecha!));
      this.nextEvents = this.events.filter((event)=> this.checkNextEvents(event.fecha!));
      this.loadingController.dismiss();
    }).catch((error)=>{
      this.loadingController.dismiss();
      this.toastService.presentErrorToast('top','Ha ocurrido un error');
    })
  }

  checkSameDate():boolean{
    let date1 = formatDate(this.date,'yyyy-MM-dd','es')
    let date2 = formatDate(new Date(),'yyyy-MM-dd','es')
    if (date1==date2){
      return true;
    }else{
      return false;
    }
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });

    loading.present();
  }

  handleDate(ev:any){
    this.date = new Date(ev.detail.value)
    this.eventsResult = this.events.filter((event)=> this.checkDate(event.fecha!))
    this.nextEvents = this.events.filter((event)=> this.checkNextEvents(event.fecha!));
  }

  checkDate(date:string){
    let dateDate:Date = new Date(date);
    let date1 = formatDate(this.date,'yyyy-MM-dd','es');
    let date2 = formatDate(dateDate,'yyyy-MM-dd','es');
    return date1==date2;
  }

  checkNextEvents(date:string){
    let dateDate:Date = new Date(date);
    let dateEven = formatDate(dateDate,'yyyy-MM-dd','es');
    let dateselec = formatDate(this.date,'yyyy-MM-dd','es');
    let selectedDate = new Date(dateselec);
    let dateEvent = new Date(dateEven);
    return dateEvent>selectedDate
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.eventsResult = this.events.filter((n) => this.checkDate(n.fecha!) && n.titulo!.toLowerCase().indexOf(query) > -1);
    this.nextEvents = this.events.filter((event)=> this.checkNextEvents(event.fecha!) && event.titulo!.toLowerCase().indexOf(query) > -1);
  }

  trackItems(index: number, itemObject: any) {
    return itemObject._id;
  }

  async createEvent(){
    const modal = await this.modalController.create({
      component: EventDetailComponent,
      componentProps: {
        data: this.date
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if(role == 'confirm'){
      this.eventService.createEvent(data).then((response)=>{
        this.eventService.emitDataUpdated();
        this.toastService.presentSuccessToast('top',response.mensaje)
      }).catch((error)=>{
        this.toastService.presentErrorToast('top','Ha ocurrido un error')
      })
    }
  }

}

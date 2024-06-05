import { Component, OnInit, inject, input } from '@angular/core';
import { IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonList, IonInput, IonLabel, IonItem, IonButton, IonIcon, AlertController, ModalController } from "@ionic/angular/standalone";
import { Event } from 'src/app/core/models/event';
import { EventsService } from 'src/app/core/services/events.service';
import { ToastServiceService } from 'src/app/core/services/toast-service.service';
import { EventDetailComponent } from '../event-detail/event-detail.component';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonItem, IonLabel, IonInput, IonList, IonCardContent, IonCardTitle, IonCardHeader, IonCard, EventDetailComponent]
})
export class EventCardComponent  implements OnInit {

  private eventsService = inject(EventsService);
  private toastService = inject(ToastServiceService);

  event = input<Event>();

  constructor(private alertCtrl:AlertController, private modalController:ModalController) {};

  ngOnInit() {
    console.log();
  };

  async onDelete(){
    const alert = await this.alertCtrl.create({
      header: '¿Desea eliminar este evento?',
      message: 'Esta evento será eliminado permanentemente',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'delete',
          handler: () => {
            this.eventsService.deleteEvent(this.event()!._id!.$oid).then((response)=>{
              this.eventsService.emitDataUpdated();
              this.toastService.presentSuccessToast('top',response.mensaje);
            }).catch((error)=>{
              this.toastService.presentErrorToast('top','Ha ocurrido un error')
            })
          },
        }
      ]
    })
    await alert.present()
  };

  async onClick(){
    const modal = await this.modalController.create({
      component: EventDetailComponent,
      componentProps: {
        data: this.event()
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if(role == 'confirm'){
      this.eventsService.updateEvent(this.event()!._id!.$oid, data).then((response)=>{
        this.eventsService.emitDataUpdated();
        this.toastService.presentSuccessToast('top',response.mensaje);
      }).catch((error)=>{
        this.toastService.presentErrorToast('top','Ha ocurrido un error');
      })
    }

  }

}

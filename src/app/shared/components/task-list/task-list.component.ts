import { Task } from './../../../core/models/task';
import { Component, OnInit, inject, input } from '@angular/core';
import { AlertController, ModalController, IonList, IonListHeader, IonLabel, IonItemSliding, IonItem, IonCheckbox, IonItemOptions, IonItemOption, IonFab, IonFabButton, IonIcon, IonContent, IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonInput, IonAlert } from "@ionic/angular/standalone";
import { TaskList } from 'src/app/core/models/task-list';
import { TasksListsService } from 'src/app/core/services/tasksLists.service';
import { TaskDetailComponent } from '../task-detail/task-detail.component';
import { ToastServiceService } from 'src/app/core/services/toast-service.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [IonAlert, IonInput, IonTitle, IonButton, IonButtons, IonToolbar, IonHeader, IonModal, IonContent, IonIcon, IonFabButton, IonFab, IonItemOption, IonItemOptions, IonCheckbox, IonItem, IonItemSliding, IonLabel, IonListHeader, IonList,]
})
export class TaskListComponent implements OnInit {

  private taskListService = inject(TasksListsService);
  private toastService = inject(ToastServiceService);

  mainTaskList = input.required<TaskList>();

  emptyMessage = "";

  constructor(private modalController: ModalController, private alertCtrl: AlertController) { }

  ngOnInit() {
    console.log();
  }

  async onDelete(task: Task) {
    const alert = await this.alertCtrl.create({
      header: '¿Desea eliminar esta tarea?',
      message: 'Esta tarea será eliminada permanentemente',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Eliminar',
          role: 'delete',
          handler: () => {
            this.taskListService.deleteTask(this.mainTaskList()._id!.$oid, task._id!.$oid).then((response) => {
              this.toastService.presentSuccessToast('top', 'Tarea eliminada');
              this.taskListService.emitDataUpdateDeleteTask();
            }).catch((error) => {
              this.toastService.presentErrorToast('top', 'Ha ocurrido un error');
            });
          },
        }
      ],
    })

    await alert.present()
  }

  async onClick(task: Task, event: any) {
    let update = {
      completed: event.detail.checked,
    }
    await this.taskListService.updateTask(this.mainTaskList()._id!.$oid, task._id!.$oid, update).then((response) => {
      //Hacer servicio de mensaje toast
      this.taskListService.emitDataUpdateCheckedTask();
    }).catch((error) => {
      this.toastService.presentErrorToast('top', 'Ha ocurrido un error');
    });
  }

  async openModal(task: Task) {
    const modal = await this.modalController.create({
      component: TaskDetailComponent,
      componentProps: {
        data: task
      }
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.taskListService.updateTask(this.mainTaskList()._id!.$oid, task._id!.$oid, data).then((response) => {
        this.taskListService.emitDataUpdateNewTask();
      }).catch((error) => {
        this.toastService.presentErrorToast('top', 'Ha ocurrido un error');
      });
    }
  }

}

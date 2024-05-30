import { Task } from './../../../core/models/task';
import { Component, OnInit, inject, input } from '@angular/core';
import { ModalController, IonList, IonListHeader, IonLabel, IonItemSliding, IonItem, IonCheckbox, IonItemOptions, IonItemOption, IonFab, IonFabButton, IonIcon, IonContent, IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonInput, IonAlert } from "@ionic/angular/standalone";
import { TaskList } from 'src/app/core/models/task-list';
import { TasksListsService } from 'src/app/core/services/tasksLists.service';
import { TaskDetailComponent } from '../task-detail/task-detail.component';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [IonAlert, IonInput, IonTitle, IonButton, IonButtons, IonToolbar, IonHeader, IonModal, IonContent, IonIcon, IonFabButton, IonFab, IonItemOption, IonItemOptions, IonCheckbox, IonItem, IonItemSliding, IonLabel, IonListHeader, IonList,]
})
export class TaskListComponent implements OnInit {

  private taskListService = inject(TasksListsService);

  mainTaskList = input.required<TaskList>();

  emptyMessage = "";

  constructor(private modalController:ModalController) { }

  ngOnInit() {
    console.log();
  }

  onDelete(task: Task) {
    this.taskListService.deleteTask(this.mainTaskList()._id!.$oid, task._id!.$oid).then((response) => {
      //Hacer servicio de mensajes toast
      this.taskListService.emitDataUpdateDeleteTask();
    }).catch((error) => {
      console.log(error);
    });
  }

  async onClick(task: Task, event: any) {
    console.log(event.detail.checked)
    let update = {
      completed: event.detail.checked,
    }
    await this.taskListService.updateTask(this.mainTaskList()._id!.$oid, task._id!.$oid, update).then((response) => {
      //Hacer servicio de mensaje toast
      this.taskListService.emitDataUpdateCheckedTask();
    }).catch((error) => {
      console.log(error);
    });
  }

  checkEmptyListTask(){
    if (this.mainTaskList()!.tareas!.length == 0){
      this.emptyMessage = "No tienes tareas pendientes"
    }
  }

  async openModal(task:Task) {
    const modal = await this.modalController.create({
      component: TaskDetailComponent,
      componentProps: {
        data: task
      },
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.taskListService.updateTask(this.mainTaskList()._id!.$oid, task._id!.$oid, data).then((response)=>{
        this.taskListService.emitDataUpdateNewTask();
      }).catch((error)=>{
        console.log(error);
      });
    }
  }

}

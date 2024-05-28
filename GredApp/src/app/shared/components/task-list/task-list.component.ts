import { Task } from './../../../core/models/task';
import { Component, OnInit, inject, input } from '@angular/core';
import { IonList, IonListHeader, IonLabel, IonItemSliding, IonItem, IonCheckbox, IonItemOptions, IonItemOption, IonFab, IonFabButton, IonIcon, IonContent, IonModal, IonHeader, IonToolbar, IonButtons, IonButton, IonTitle, IonInput, IonReorderGroup, IonAlert, IonRadio, IonRadioGroup } from "@ionic/angular/standalone";
import { TaskList } from 'src/app/core/models/task-list';
import { TasksListsService } from 'src/app/core/services/tasksLists.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss'],
  standalone: true,
  imports: [IonRadioGroup, IonRadio, IonAlert, IonInput, IonTitle, IonButton, IonButtons, IonToolbar, IonHeader, IonModal, IonContent, IonIcon, IonFabButton, IonFab, IonItemOption, IonItemOptions, IonCheckbox, IonItem, IonItemSliding, IonLabel, IonListHeader, IonList,]
})
export class TaskListComponent implements OnInit {

  private taskListService = inject(TasksListsService);

  mainTaskList = input.required<TaskList>();

  emptyMessage = "";

  constructor() { }

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

}

import { Task } from './../../../core/models/task';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonIcon, IonButton, IonLabel, IonList, IonItemSliding, IonItem, IonCheckbox, IonItemOption, IonItemOptions } from '@ionic/angular/standalone';
import { TaskList } from 'src/app/core/models/task-list';
import { TaskListComponent } from 'src/app/shared/components/task-list/task-list.component';
import { TasksListsService } from 'src/app/core/services/tasksLists.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-completed-tasks',
  templateUrl: './completed-tasks.page.html',
  styleUrls: ['./completed-tasks.page.scss'],
  standalone: true,
  imports: [IonItemOptions, IonItemOption, IonCheckbox, IonItem, IonItemSliding, IonList, TaskListComponent, IonLabel, IonButton, IonIcon, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class CompletedTasksPage implements OnInit {

  private tasksListService = inject(TasksListsService);
  private router = inject(Router);

  taskLists:TaskList[];
  tasks:Task[];
  userID:string;
  emptyMessage = "";

  constructor(private loadingController:LoadingController) {
    this.userID = localStorage.getItem('userID')!;
    this.taskLists = [];
    this.tasks = [];
    this.tasksListService.onDataUpdateCheckedTask().subscribe(() => this.loadCompletedTask())
    this.tasksListService.onDataUpdateDeleteTask().subscribe(() => this.loadCompletedTask())
  }

  ngOnInit() {
    this.showLoading();
    this.tasksListService.getCompletedTasks(this.userID).then((response)=>{
      this.tasks = response;
      this.checkEmptyListTask();
      this.tasksListService.getTasksByUser(this.userID).then((response) => {
        this.taskLists = response;
      })
      this.loadingController.dismiss();
    }).catch((error)=>{
      console.log(error);
    });
  }

  loadCompletedTask(){
    this.tasksListService.getCompletedTasks(this.userID).then((response) => {
      this.tasks = response;
      this.checkEmptyListTask();
    }).catch((error) => {
      console.log(error);
    })
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });

    loading.present();
  }

  onClick(task:Task, event:any){
    console.log(event.detail.checked)
    let update = {
      completed: event.detail.checked,
    }
    let taskListID = this.findTaskListIdFromTask(this.taskLists, task);
    this.tasksListService.updateTask(taskListID, task._id!.$oid, update).then((response) => {
      //Hacer servicio de mensaje toast
      this.tasksListService.emitDataUpdateCheckedTask();
    }).catch((error) => {
      console.log(error);
    });
  }

  onDelete(task:Task){
    let taskListID = this.findTaskListIdFromTask(this.taskLists, task);
    this.tasksListService.deleteTask(taskListID, task._id!.$oid).then((response) => {
      //Hacer servicio de mensajes toast
      this.tasksListService.emitDataUpdateDeleteTask();
    }).catch((error) => {
      console.log(error);
    });
  }

  findTaskListIdFromTask(taskLists:TaskList[], task:Task):string{
    let taskListID:string = ''
    for (let index = 0; index < taskLists.length; index++) {
      taskLists[index].tareas?.map((taskL)=>{
        if (taskL._id!.$oid == task._id!.$oid){
          taskListID = taskLists[index]._id!.$oid
        }
      })
    }
    return taskListID;
  }

  checkEmptyListTask(){
    if (this.tasks.length == 0){
      this.emptyMessage = "No tienes tareas completadas"
    }
  }

}

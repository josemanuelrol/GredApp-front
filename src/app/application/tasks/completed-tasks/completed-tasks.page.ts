import { Task } from './../../../core/models/task';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingController, IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonIcon, IonButton, IonLabel, IonList, IonItemSliding, IonItem, IonCheckbox, IonItemOption, IonItemOptions } from '@ionic/angular/standalone';
import { TaskList } from 'src/app/core/models/task-list';
import { TaskListComponent } from 'src/app/shared/components/task-list/task-list.component';
import { TasksListsService } from 'src/app/core/services/tasksLists.service';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/core/services/toast-service.service';

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
  private toastService = inject(ToastServiceService);

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
      this.loadingController.dismiss();
      this.toastService.presentErrorToast('top','Ha ocurrido un error');
    });
  }

  loadCompletedTask(){
    this.tasksListService.getCompletedTasks(this.userID).then((response) => {
      this.tasks = response;
      this.checkEmptyListTask();
    }).catch((error) => {
      this.toastService.presentErrorToast('top','Ha ocurrido un error');
    })
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });

    loading.present();
  }

  onClick(task:Task, event:any){
    let update = {
      completed: event.detail.checked,
    }
    let taskListID = this.findTaskListIdFromTask(this.taskLists, task);
    this.tasksListService.updateTask(taskListID, task._id!.$oid, update).then((response) => {
      this.tasksListService.emitDataUpdateCheckedTask();
    }).catch((error) => {
      this.toastService.presentErrorToast('top','Ha ocurrido un error');
    });
  }

  onDelete(task:Task){
    let taskListID = this.findTaskListIdFromTask(this.taskLists, task);
    this.tasksListService.deleteTask(taskListID, task._id!.$oid).then((response) => {
      this.toastService.presentSuccessToast('top', 'Tarea eliminada');
      this.tasksListService.emitDataUpdateDeleteTask();
    }).catch((error) => {
      this.toastService.presentErrorToast('top','Ha ocurrido un error');
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

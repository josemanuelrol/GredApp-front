import { TaskListComponent } from '../../../shared/components/task-list/task-list.component';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingController, AlertController, IonContent, IonHeader, IonTitle, IonToolbar, IonRefresher, IonRefresherContent, IonFab, IonFabButton, IonIcon, IonButton, IonSegment, IonSegmentButton, IonLabel, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonSearchbar, IonList, IonListHeader, IonItem, IonCheckbox, IonItemSliding, IonItemOptions, IonItemOption, IonButtons, IonActionSheet, IonGrid, IonCol, IonRow, IonModal } from '@ionic/angular/standalone';
import { TasksListsService } from 'src/app/core/services/tasksLists.service';
import { TaskList } from 'src/app/core/models/task-list';
import { Router } from '@angular/router';
import { ToastServiceService } from 'src/app/core/services/toast-service.service';


@Component({
  selector: 'app-tasks-main',
  templateUrl: './tasks-main.page.html',
  styleUrls: ['./tasks-main.page.scss'],
  standalone: true,
  imports: [IonModal, IonRow, IonCol, IonGrid, IonActionSheet, IonButtons, TaskListComponent ,IonItemOption, IonItemOptions, IonItemSliding, IonCheckbox, IonItem, IonListHeader, IonList, IonSearchbar, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonLabel, IonSegmentButton, IonSegment, IonButton, IonIcon, IonFabButton, IonFab, IonRefresherContent, IonRefresher, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TasksMainPage implements OnInit {

  private taskListService = inject(TasksListsService);
  private router = inject(Router);
  private toastService = inject(ToastServiceService);

  userID:string;
  taskLists:TaskList[];
  taskListsResult:TaskList[];
  mainTaskList:TaskList;
  isActionSheetOpen = false;
  actionSheetButtons = [
    {
      text: 'Tareas completadas',
      role: 'completedTasks',
      data: {
        action: 'completedTasks'
      }
    },
    {
      text: 'Nueva lista',
      role: 'newTaskList',
      data: {
        action: 'newTaskList'
      }
    },
    {
      text: 'Cancelar',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];
  alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel'
    },
    {
      text: 'Crear',
      role: 'create',
      handler: (data: any) => {
        if (data[0] != ''){
          let newList:TaskList = {
            nombre : data[0],
            user_id: this.userID,
            tareas: []
          }
          this.taskListService.createTaskList(newList).then((response)=>{
            this.toastService.presentSuccessToast('top','Lista de tareas creada');
            this.taskListService.emitDataUpdatedList();
          }).catch((error)=>{
            this.toastService.presentErrorToast('top','Ha ocurrido un error');
          })
        }
      }
    }
  ];
  alertInputs = [
    {
      placeholder: 'Titulo',
    },
  ];
  alertButtonsTask = [
    {
      text: 'Cancelar',
      role: 'cancel'
    },
    {
      text: 'Crear',
      role: 'create',
      handler: (data: any) => {
        if (data[0] != ''){
          let newTask = {
            titulo:data[0],
            descripcion: data[1]
          }
          this.taskListService.addTask(this.mainTaskList._id!.$oid, newTask).then((response)=>{
            this.toastService.presentSuccessToast('top','Tarea creada');
            this.taskListService.emitDataUpdateNewTask();
          }).catch((error)=>{
            this.toastService.presentErrorToast('top','Ha ocurrido un error');
          })
        }
      }
    }
  ];
  alertInputsTask = [
    {
      placeholder: 'Titulo',
    },
    {
      placeholder: 'Descripción (50 caracteres)',
      attributes: {
        maxlength: 50,
      },
    },
  ];

  constructor(private loadingController:LoadingController, private alertController:AlertController) {
    this.userID = localStorage.getItem('userID')!;
    this.taskLists = [];
    this.taskListsResult = [...this.taskLists];
    this.mainTaskList = {};
    this.taskListService.onDataUpdateList().subscribe(() => this.loadTaskList());
    this.taskListService.onDataUpdateNewTask().subscribe(() => this.loadTaskList());
    this.taskListService.onDataUpdateDeleteTask().subscribe(()=> this.loadTaskList());
    this.taskListService.onDataUpdateCheckedTask().subscribe(() => this.loadTaskListWithOutLoading());
  }

  ngOnInit() {
    this.loadTaskList();
  }

  handleRefresh(event:any){
    this.taskListService.getTasksByUser(this.userID).then((response) => {
      response.map((list) => {
        list.tareas = list.tareas?.filter(task => !task.completed);
      })
      this.mainTaskList = response[0];
      this.taskLists = response.filter((list) => list.nombre != 'Bandeja de entrada');
      this.taskListsResult = [...this.taskLists];
      event.target.complete();
    }).catch((error)=>{
      event.target.complete();
      this.toastService.presentErrorToast('top','Ha ocurrido un error');
    });
  }

  handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.taskListsResult = this.taskLists.filter((list) => list.nombre!.toLowerCase().indexOf(query) > -1);
  }

  trackItems(index: number, itemObject: any) {
    return itemObject._id;
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });

    loading.present();
  }

  handleResult(ev:any, isOpen:boolean) {
    this.isActionSheetOpen = isOpen;
    if (ev.detail.role == 'completedTasks'){
      this.router.navigate(['app/tasks/completed-tasks']);
    }else if (ev.detail.role == 'newTaskList'){
      this.createList();
    }
  }

  setOpenActionSheet(isOpen:boolean){
    this.isActionSheetOpen = isOpen
  }

  loadTaskList(){
    this.showLoading();
    this.taskListService.getTasksByUser(this.userID).then((response) => {
      response.map((list) => {
        list.tareas = list.tareas?.filter(task => !task.completed);
      })
      this.mainTaskList = response[0];
      this.taskLists = response.filter((list) => list.nombre != 'Bandeja de entrada');
      this.taskListsResult = [...this.taskLists];
      this.loadingController.dismiss();
    }).catch((error)=>{
      this.loadingController.dismiss();
      this.toastService.presentErrorToast('top','Ha ocurrido un error');
    });
  }

  loadTaskListWithOutLoading(){
    this.taskListService.getTasksByUser(this.userID).then((response) => {
      response.map((list) => {
        list.tareas = list.tareas?.filter(task => !task.completed);
      })
      this.mainTaskList = response[0];
      this.taskLists = response.filter((list) => list.nombre != 'Bandeja de entrada');
      this.taskListsResult = [...this.taskLists];
    }).catch((error)=>{
      this.toastService.presentErrorToast('top','Ha ocurrido un error');
    });
  }

  onClick(list:TaskList){
    this.router.navigate(['app/tasks/tasklist', list._id!.$oid],{
      state:{
        key: list._id!.$oid,
        data: list
      }
    })
  }

  async createList() {
    const alert = await this.alertController.create({
      header: 'Crear lista',
      buttons: this.alertButtons,
      inputs: this.alertInputs,
    });

    await alert.present();
  }

  async createTask() {
    const alert = await this.alertController.create({
      header: 'Crear tarea',
      buttons: this.alertButtonsTask,
      inputs: this.alertInputsTask,
    });

    await alert.present();
  }

}

import { TaskListComponent } from '../../../shared/components/task-list/task-list.component';
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonBackButton, IonButton, IonIcon, IonList, IonListHeader, IonLabel, IonItem, IonItemSliding, IonCheckbox, IonItemOptions, IonItemOption, IonTextarea, IonInput, IonFab, IonFabButton } from '@ionic/angular/standalone';
import { TasksListsService } from 'src/app/core/services/tasksLists.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskList } from 'src/app/core/models/task-list';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-task-list-detail',
  templateUrl: './task-list-detail.page.html',
  styleUrls: ['./task-list-detail.page.scss'],
  standalone: true,
  imports: [IonFabButton, IonFab, ReactiveFormsModule, IonInput, TaskListComponent, IonItemOption, IonItemOptions, IonCheckbox, IonItemSliding, IonItem, IonLabel, IonListHeader, IonList, IonIcon, IonButton, IonBackButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TaskListDetailPage implements OnInit {

  private taskListService = inject(TasksListsService);
  private router = inject(Router);

  taskList:TaskList;
  taskListID:string;
  alertButtons = [
    {
      text: 'Cancelar',
      role: 'cancel',
    },
    {
      text: 'Eliminar',
      role: 'delete',
      handler: () => {
        this.taskListService.deleteTaskList(this.taskList._id!.$oid).then((response)=>{
          this.taskListService.emitDataUpdatedList();
          this.router.navigate(['app/tasks']);
        }).catch((error)=>{
          console.log(error);
        })
      },
    }
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
          this.taskListService.addTask(this.taskList._id!.$oid, newTask).then((response)=>{
            this.taskListService.emitDataUpdateNewTask();
          }).catch((error)=>{
            console.log(error);
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

  nombreControl: FormControl

  constructor(private loadingController:LoadingController, private alertCtrl: AlertController, private route:ActivatedRoute, private alertController:AlertController) {
    this.taskListID = this.route.snapshot.paramMap.get('id')!;
    this.taskList = this.router.getCurrentNavigation()!.extras.state!['data'];
    this.nombreControl = new FormControl(this.taskList.nombre, Validators.required);
    this.taskListService.onDataUpdateNewTask().subscribe(() => this.loadTasksWithOutLoading());
    this.taskListService.onDataUpdateDeleteTask().subscribe(() => this.loadTasksWithOutLoading());
    this.taskListService.onDataUpdateCheckedTask().subscribe(() => this.loadTasksWithOutLoading());
  }

  ngOnInit() {
    console.log();
  }

  loadTasks(){
    this.showLoading();
    this.taskListService.getTaskListById(this.taskListID).then((list)=>{
      this.taskList = list;
      this.taskList.tareas = this.taskList.tareas!.filter(task => !task.completed)
      this.loadingController.dismiss();
    }).catch((error)=>{
      this.loadingController.dismiss();
      console.log(error);
    })
  }

  loadTasksWithOutLoading(){
    this.taskListService.getTaskListById(this.taskListID).then((list)=>{
      this.taskList = list;
      this.taskList.tareas = this.taskList.tareas!.filter(task => !task.completed)
    }).catch((error)=>{
      console.log(error);
    })
  }

  async showLoading() {
    const loading = await this.loadingController.create({
      message: 'Loading...',
    });

    loading.present();
  }

  async onDelete(){
    const alert = await this.alertCtrl.create({
      header: '¿Desea eliminar esta lista?',
      message: 'Esta lista será eliminada permanentemente',
      buttons: this.alertButtons
    })

    await alert.present()
  }

  async createTask() {
    const alert = await this.alertController.create({
      header: 'Crear tarea',
      buttons: this.alertButtonsTask,
      inputs: this.alertInputsTask,
    });

    await alert.present();
  }

  onBack(){
    let list:TaskList = {
      nombre: this.nombreControl.getRawValue()
    }
    if(this.taskList.nombre != list.nombre){
      this.taskListService.updateTaskList(this.taskList._id!.$oid, list).then((response)=>{
        this.taskListService.emitDataUpdatedList();
      }).catch((error)=>{
        console.log(error);
      })
    }
  }

}

import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonAlert, IonButton} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonButton, IonAlert, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {

  constructor() {}

}

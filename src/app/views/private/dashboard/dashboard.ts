import { Component, inject } from '@angular/core';
import { Loading } from '@services/loading';
@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  private loadingService = inject(Loading);

constructor() {
  this.loadingService.hide();

}
}

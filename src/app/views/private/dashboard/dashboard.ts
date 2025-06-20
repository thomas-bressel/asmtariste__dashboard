import { Component, inject } from '@angular/core';
import { Loading } from '@services/loading';
import { Header } from 'src/app/components/header/header';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  imports: [RouterOutlet, Header],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard {

  private loadingService = inject(Loading);

constructor() {
  this.loadingService.hide();

}
}
